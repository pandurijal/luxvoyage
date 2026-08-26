import React, { useEffect, useState } from 'react';
import { ArrowLeft, AlertCircle, Inbox } from 'lucide-react';
import { ViewState, Order, OrderStatus } from '../types';
import { formatIDR } from '../data';
import { supabase } from '../lib/supabase';

interface AdminProps {
  onNavigate: (view: ViewState) => void;
}

const statusStyles: Record<OrderStatus, { label: string; classes: string }> = {
  pending: { label: 'Pending', classes: 'bg-amber-50 text-amber-700 border-amber-100' },
  confirmed: { label: 'Confirmed', classes: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-50 text-red-700 border-red-100' },
};

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatDateTime = (dateStr: string): string => {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const Admin: React.FC<AdminProps> = ({ onNavigate }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setOrders((data as Order[]) ?? []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-[#FDFBF7] flex-1 flex flex-col">
      <div className="bg-slate-900 text-white pt-28 pb-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => onNavigate({ name: 'home' })}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-white/60 tracking-widest uppercase text-sm mb-2">Internal</p>
              <h1 className="text-4xl md:text-5xl font-light">Admin Dashboard</h1>
            </div>
            {!loading && !error && (
              <p className="text-white/60 text-sm tracking-widest uppercase">
                {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-12 w-full pb-24">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400 font-light">Loading orders…</div>
          ) : error ? (
            <div className="p-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900 mb-1">Failed to load orders</p>
                <p className="text-sm text-red-700 font-light">{error}</p>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-16 text-center">
              <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-light">No orders yet.</p>
              <p className="text-slate-400 text-sm font-light mt-1">
                Reservations submitted from the booking flow will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs tracking-widest uppercase text-slate-500 border-b border-slate-100">
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Package</th>
                    <th className="px-6 py-4 font-medium">Travel Date</th>
                    <th className="px-6 py-4 font-medium text-right">Total</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const status = statusStyles[order.status];
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">{order.customer_name}</p>
                          <p className="text-sm text-slate-500 font-light">{order.customer_email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-slate-700 max-w-xs truncate">{order.package_title}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                          {formatDate(order.travel_date)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-slate-900 whitespace-nowrap">
                          {formatIDR(order.total_price)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase border ${status.classes}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 font-light whitespace-nowrap">
                          {order.created_at ? formatDateTime(order.created_at) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
