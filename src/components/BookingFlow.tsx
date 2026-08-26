import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, MessageSquare, AlertCircle, CreditCard, Loader2 } from 'lucide-react';
import { packages, formatIDR } from '../data';
import { ViewState, Order } from '../types';
import { supabase } from '../lib/supabase';
import { createInquiry, PaymentMethodCode } from '../lib/duitku';

interface BookingFlowProps {
  packageId: string;
  onNavigate: (view: ViewState) => void;
  onOrderCreated?: (order: Order) => void;
}

const PAYMENT_METHOD: PaymentMethodCode = 'BC';

export const BookingFlow: React.FC<BookingFlowProps> = ({ packageId, onNavigate, onOrderCreated }) => {
  const pkg = packages.find(p => p.id === packageId);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isStartingPayment, setIsStartingPayment] = useState(false);

  if (!pkg) return null;

  const totalUpgrades = pkg.upgrades
    .filter(u => selectedUpgrades.includes(u.id))
    .reduce((sum, u) => sum + u.price, 0);

  const totalPrice = pkg.price + totalUpgrades;

  const handleUpgradeToggle = (id: string) => {
    setSelectedUpgrades(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const handleCompleteBooking = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const selectedUpgradeDetails = pkg.upgrades.filter(u => selectedUpgrades.includes(u.id));

    const order: Order = {
      package_id: pkg.id,
      package_title: pkg.title,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      travel_date: formData.date,
      selected_upgrades: selectedUpgradeDetails,
      total_price: totalPrice,
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select('*')
      .single();

    if (error || !data) {
      setSubmitError(error?.message ?? 'Failed to create order');
      setIsSubmitting(false);
      return;
    }

    onOrderCreated?.(data);
    setCreatedOrder(data);
    setIsSubmitting(false);
  };

  const handlePayNow = async () => {
    if (!createdOrder?.id) return;
    setIsStartingPayment(true);
    setPaymentError(null);

    try {
      const returnUrl = `${window.location.origin}${window.location.pathname}#/payment_return/${createdOrder.id}`;
      const inquiry = await createInquiry({
        merchantOrderId: createdOrder.id,
        paymentAmount: totalPrice,
        paymentMethod: PAYMENT_METHOD,
        productDetails: pkg.title,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        returnUrl,
      });

      window.location.href = inquiry.paymentUrl;
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : 'Failed to start payment');
      setIsStartingPayment(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-[calc(100vh-6rem)] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => onNavigate({ name: 'package', packageId: pkg.id })}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Package
        </button>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-3">Reserve Your Journey</h1>
          <p className="text-slate-500 font-light">Tell us when you'd like to travel and who's joining. Your concierge will handle the rest.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-12">
            {createdOrder ? (
              <section className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-light text-emerald-900 mb-1">Reservation Received</h2>
                      <p className="text-emerald-800 font-light">
                        Reference <span className="font-mono text-sm">{createdOrder.id?.slice(0, 8)}</span> — secure your spot by completing payment now, or pay later via your dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                {paymentError && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-900 mb-1">Payment could not be started</p>
                      <p className="text-sm text-red-700 font-light">{paymentError}</p>
                    </div>
                  </div>
                )}

                <button
                  disabled={isStartingPayment}
                  onClick={handlePayNow}
                  className="w-full bg-slate-900 text-white py-4 rounded-full tracking-widest uppercase text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isStartingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Connecting to Duitku...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" /> Pay Now via Duitku
                    </>
                  )}
                </button>

                <button
                  onClick={() => onNavigate({ name: 'dashboard' })}
                  className="w-full bg-white text-slate-900 py-4 rounded-full tracking-widest uppercase text-sm font-medium border border-slate-300 hover:border-slate-900 transition-colors"
                >
                  Skip — Pay Later from Dashboard
                </button>
              </section>
            ) : (
              <>
            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-medium text-slate-900 mb-1">Preferred Start Date</h2>
                <p className="text-sm text-slate-500 font-light">Choose your ideal departure date.</p>
              </div>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors text-lg"
              />
            </section>

            {pkg.upgrades.length > 0 && (
              <section className="space-y-4">
                <div>
                  <h2 className="text-xl font-medium text-slate-900 mb-1">Enhance Your Experience</h2>
                  <p className="text-sm text-slate-500 font-light">Optional upgrades to elevate your journey.</p>
                </div>
                <div className="space-y-3">
                  {pkg.upgrades.map(upgrade => (
                    <div
                      key={upgrade.id}
                      onClick={() => handleUpgradeToggle(upgrade.id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex gap-4 ${
                        selectedUpgrades.includes(upgrade.id) ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-400'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedUpgrades.includes(upgrade.id) ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300'
                      }`}>
                        {selectedUpgrades.includes(upgrade.id) && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900 mb-1">{upgrade.title}</h4>
                        <p className="text-sm text-slate-500 font-light mb-2">{upgrade.description}</p>
                        <p className="text-sm font-medium text-slate-900">+{formatIDR(upgrade.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-slate-900 mb-1">Lead Guest Information</h2>
                <p className="text-sm text-slate-500 font-light">Your concierge will use this to coordinate travel documents and preferences.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase text-slate-500 mb-2">Full Name (As in Passport)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase text-slate-500 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-widest uppercase text-slate-500 mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors"
                    placeholder="+62 812 3456 7890"
                  />
                </div>
              </div>
            </section>

            {submitError && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900 mb-1">Unable to submit reservation</p>
                  <p className="text-sm text-red-700 font-light">{submitError}</p>
                </div>
              </div>
            )}

            <button
              disabled={!formData.date || !formData.name || !formData.email || !formData.phone || isSubmitting}
              onClick={handleCompleteBooking}
              className="w-full bg-slate-900 text-white py-4 rounded-full tracking-widest uppercase text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Reservation'} <ChevronRight className="w-4 h-4" />
            </button>
              </>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 sticky top-32">
              <h3 className="text-sm tracking-widest uppercase text-slate-500 mb-6">Reservation Summary</h3>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                <img src={pkg.heroImage} alt={pkg.title} className="w-24 h-24 object-cover rounded-xl" />
                <div>
                  <h4 className="font-medium text-slate-900 mb-1">{pkg.title}</h4>
                  <p className="text-sm text-slate-500">{pkg.location}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-light text-sm">Base Package</span>
                  <span className="font-medium">{formatIDR(pkg.price)}</span>
                </div>
                {pkg.upgrades.filter(u => selectedUpgrades.includes(u.id)).map(u => (
                  <div key={u.id} className="flex justify-between">
                    <span className="text-slate-600 font-light text-sm">{u.title}</span>
                    <span className="font-medium">+{formatIDR(u.price)}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-900 font-medium">Total Investment</span>
                  <span className="text-2xl font-medium text-slate-900">{formatIDR(totalPrice)}</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3 border border-emerald-100">
                <MessageSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 font-light">
                  Once you confirm, a dedicated concierge will contact you via WhatsApp within 15 minutes to coordinate your itinerary and document requirements.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
