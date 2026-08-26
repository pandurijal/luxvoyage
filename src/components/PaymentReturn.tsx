import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, Loader2, ArrowLeft, MessageSquare } from 'lucide-react';
import { ViewState, Order } from '../types';
import { supabase } from '../lib/supabase';
import { checkTransactionStatus, mapPaymentStatus } from '../lib/duitku';
import { packages, formatIDR } from '../data';

interface PaymentReturnProps {
  orderId: string;
  onNavigate: (view: ViewState) => void;
}

type CheckState =
  | { phase: 'loading' }
  | { phase: 'success'; order: Order }
  | { phase: 'pending'; order: Order }
  | { phase: 'failed'; order: Order; reason: string }
  | { phase: 'error'; message: string };

export const PaymentReturn: React.FC<PaymentReturnProps> = ({ orderId, onNavigate }) => {
  const [state, setState] = useState<CheckState>({ phase: 'loading' });

  useEffect(() => {
    let cancelled = false;

    async function reconcile() {
      try {
        const { data: order, error: fetchErr } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (fetchErr || !order) {
          throw new Error(fetchErr?.message ?? 'Order not found');
        }

        const status = await checkTransactionStatus(order.duitku_reference ?? orderId);

        if (cancelled) return;

        const newPaymentStatus = mapPaymentStatus(status.statusCode);
        const paidAt = newPaymentStatus === 'paid' ? new Date().toISOString() : order.paid_at;

        const { data: updated, error: updateErr } = await supabase
          .from('orders')
          .update({
            payment_status: newPaymentStatus,
            duitku_reference: status.reference,
            paid_at: paidAt,
          })
          .eq('id', orderId)
          .select('*')
          .single();

        if (updateErr || !updated) {
          throw new Error(updateErr?.message ?? 'Failed to update order');
        }

        if (newPaymentStatus === 'paid') {
          setState({ phase: 'success', order: updated });
        } else if (newPaymentStatus === 'pending') {
          setState({ phase: 'pending', order: updated });
        } else {
          setState({
            phase: 'failed',
            order: updated,
            reason: status.statusMessage ?? 'Payment was not completed',
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            phase: 'error',
            message: err instanceof Error ? err.message : 'Unknown error',
          });
        }
      }
    }

    reconcile();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (state.phase === 'loading') {
    return (
      <div className="bg-[#FDFBF7] min-h-[calc(100vh-6rem)] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Loader2 className="w-12 h-12 text-slate-900 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-light text-slate-900 mb-2">Confirming Your Payment</h2>
          <p className="text-slate-500 font-light">Verifying your transaction with our payment provider...</p>
        </div>
      </div>
    );
  }

  if (state.phase === 'error') {
    return (
      <div className="bg-[#FDFBF7] min-h-[calc(100vh-6rem)] flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-light text-slate-900 text-center mb-2">Something Went Wrong</h2>
            <p className="text-slate-500 font-light text-center mb-6">{state.message}</p>
            <button
              onClick={() => onNavigate({ name: 'dashboard' })}
              className="w-full bg-slate-900 text-white py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-slate-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { order, phase } = state;
  const pkg = packages.find((p) => p.id === order.package_id);

  const visuals = {
    success: {
      icon: <CheckCircle className="w-12 h-12 text-emerald-600" />,
      title: 'Payment Confirmed',
      subtitle: 'Your journey is secured. Our concierge will reach out shortly.',
      bgClass: 'bg-emerald-50',
      textClass: 'text-emerald-900',
      subClass: 'text-emerald-700',
    },
    pending: {
      icon: <Clock className="w-12 h-12 text-amber-600" />,
      title: 'Payment Pending',
      subtitle: 'We received your payment notification and are awaiting final confirmation.',
      bgClass: 'bg-amber-50',
      textClass: 'text-amber-900',
      subClass: 'text-amber-700',
    },
    failed: {
      icon: <XCircle className="w-12 h-12 text-red-600" />,
      title: 'Payment Not Completed',
      subtitle: phase === 'failed' ? state.reason : 'Your reservation has been saved.',
      bgClass: 'bg-red-50',
      textClass: 'text-red-900',
      subClass: 'text-red-700',
    },
  } as const;

  const v = visuals[phase];

  return (
    <div className="bg-[#FDFBF7] min-h-[calc(100vh-6rem)] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate({ name: 'dashboard' })}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className={`${v.bgClass} p-12 text-center`}>
            <div className="flex justify-center mb-4">{v.icon}</div>
            <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-3">{v.title}</h1>
            <p className={`${v.subClass} font-light max-w-md mx-auto`}>{v.subtitle}</p>
          </div>

          <div className="p-8 border-t border-slate-100">
            <h3 className="text-xs tracking-widest uppercase text-slate-500 mb-4">Reservation Summary</h3>
            {pkg && (
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                <img src={pkg.heroImage} alt={pkg.title} className="w-20 h-20 object-cover rounded-xl" />
                <div>
                  <h4 className="font-medium text-slate-900">{pkg.title}</h4>
                  <p className="text-sm text-slate-500">{pkg.location}</p>
                </div>
              </div>
            )}
            <div className="flex justify-between items-end mb-6">
              <span className="text-slate-600 font-light">Total Investment</span>
              <span className="text-xl font-medium text-slate-900">{formatIDR(order.total_price)}</span>
            </div>

            {order.duitku_reference && (
              <div className="bg-slate-50 p-4 rounded-xl mb-6">
                <p className="text-xs tracking-widest uppercase text-slate-500 mb-1">Reference</p>
                <p className="font-mono text-sm text-slate-900 break-all">{order.duitku_reference}</p>
              </div>
            )}

            {phase === 'success' && (
              <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3 border border-emerald-100 mb-6">
                <MessageSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 font-light">
                  A dedicated concierge will contact you via WhatsApp within 15 minutes to coordinate your itinerary.
                </p>
              </div>
            )}

            <button
              onClick={() => onNavigate({ name: 'dashboard' })}
              className="w-full bg-slate-900 text-white py-4 rounded-full tracking-widest uppercase text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
