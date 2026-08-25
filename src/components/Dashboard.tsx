import React from 'react';
import { ArrowLeft, FileText, CheckCircle, Clock, Plane, Download, MessageCircle, MapPin, Calendar } from 'lucide-react';
import { ViewState, Order, OrderStatus } from '../types';
import { packages, formatIDR } from '../data';

interface DashboardProps {
  order?: Order | null;
  onNavigate: (view: ViewState) => void;
}

const formatTravelDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const calculateDaysUntil = (dateStr: string): number => {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

const statusConfig: Record<OrderStatus, { label: string; classes: string }> = {
  pending: { label: 'Pending Confirmation', classes: 'bg-amber-50 text-amber-700 border-amber-100' },
  confirmed: { label: 'Confirmed', classes: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-50 text-red-700 border-red-100' },
};

export const Dashboard: React.FC<DashboardProps> = ({ order, onNavigate }) => {
  const pkg = order ? packages.find(p => p.id === order.package_id) : null;
  const status = order ? statusConfig[order.status] : null;
  const daysUntil = order ? calculateDaysUntil(order.travel_date) : 0;

  return (
    <div className="bg-[#FDFBF7] flex-1 flex flex-col">
      <div className="bg-slate-900 text-white pt-12 pb-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => onNavigate({ name: 'home' })}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Collection
          </button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-white/60 tracking-widest uppercase text-sm mb-2">
                {order ? 'Reservation Received' : 'Welcome Back'}
              </p>
              <h1 className="text-4xl md:text-5xl font-light">
                {order ? order.customer_name : 'Alexander Sterling'}
              </h1>
              {order && (
                <p className="text-white/70 font-light mt-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Your concierge will reach out via WhatsApp shortly
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full text-sm tracking-widest uppercase flex items-center gap-2 transition-colors">
                <MessageCircle className="w-4 h-4" /> Contact Concierge
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
        
        <div className="lg:col-span-2 space-y-8">
          
          {order && pkg ? (
            <>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-xs tracking-widest uppercase text-slate-500 mb-1">Upcoming Journey</p>
                    <h2 className="text-2xl font-light text-slate-900">{order.package_title}</h2>
                    <p className="text-slate-600 font-light mt-1 flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {pkg.location}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Departing {formatTravelDate(order.travel_date)}
                      </span>
                    </p>
                  </div>
                  {status && (
                    <div className={`px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase border whitespace-nowrap ${status.classes}`}>
                      {status.label}
                    </div>
                  )}
                </div>
                
                <div className="p-8 bg-slate-50/50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-4xl font-light text-slate-900 mb-1">{daysUntil}</p>
                      <p className="text-xs tracking-widest uppercase text-slate-500">Days</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-4xl font-light text-slate-900 mb-1">—</p>
                      <p className="text-xs tracking-widest uppercase text-slate-500">Hours</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <p className="text-4xl font-light text-slate-900 mb-1">—</p>
                      <p className="text-xs tracking-widest uppercase text-slate-500">Minutes</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
                      <Plane className="w-8 h-8 text-slate-400 mb-2" />
                      <p className="text-xs tracking-widest uppercase text-slate-500">Until Departure</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 border-t border-slate-100">
                  <h3 className="text-sm tracking-widest uppercase text-slate-900 mb-6 font-medium">Reservation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs tracking-widest uppercase text-slate-500 mb-1">Lead Guest</p>
                      <p className="font-medium text-slate-900">{order.customer_name}</p>
                      <p className="text-sm text-slate-500">{order.customer_email}</p>
                      <p className="text-sm text-slate-500">{order.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-slate-500 mb-1">Total Investment</p>
                      <p className="text-2xl font-light text-slate-900">{formatIDR(order.total_price)}</p>
                      {order.selected_upgrades.length > 0 && (
                        <p className="text-sm text-slate-500 mt-1">
                          + {order.selected_upgrades.length} upgrade{order.selected_upgrades.length > 1 ? 's' : ''} included
                        </p>
                      )}
                    </div>
                  </div>
                  {order.selected_upgrades.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <p className="text-xs tracking-widest uppercase text-slate-500 mb-3">Selected Upgrades</p>
                      <div className="space-y-2">
                        {order.selected_upgrades.map(u => (
                          <div key={u.id} className="flex justify-between text-sm">
                            <span className="text-slate-700">{u.title}</span>
                            <span className="text-slate-900 font-medium">+{formatIDR(u.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                <h3 className="text-sm tracking-widest uppercase text-slate-900 mb-6 font-medium">What's Next</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Reservation Submitted</p>
                      <p className="text-xs text-slate-500 font-light mt-0.5">We've received your request</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">Concierge Contact</p>
                      <p className="text-xs text-slate-500 font-light mt-0.5">Within 15 minutes via WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-500">Passport & Document Verification</p>
                      <p className="text-xs text-slate-400 font-light mt-0.5">After concierge intake call</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-500">Final Itinerary Confirmation</p>
                      <p className="text-xs text-slate-400 font-light mt-0.5">Sent 7 days before departure</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                <img src="https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=2670&auto=format&fit=crop" alt="Swiss Alps" className="w-24 h-24 object-cover rounded-xl" />
                <div>
                  <p className="text-xs tracking-widest uppercase text-slate-500 mb-1">Upcoming Journey</p>
                  <h2 className="text-2xl font-light text-slate-900">Swiss Alps Winter Retreat</h2>
                  <p className="text-slate-600 font-light mt-1">Zermatt, Switzerland • Dec 15 - 21, 2026</p>
                </div>
              </div>
              <div className="text-center py-8 text-slate-500">
                <p className="font-light">No active reservation yet.</p>
                <p className="text-sm font-light mt-1">Book a journey to see your details here.</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-sm tracking-widest uppercase text-slate-900 mb-6 font-medium">Travel Documents</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-300" />
                  <div>
                    <p className="text-sm font-medium text-slate-400">E-Ticket</p>
                    <p className="text-xs text-slate-400">Available after confirmation</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-300" />
                  <div>
                    <p className="text-sm font-medium text-slate-400">Visa Documents</p>
                    <p className="text-xs text-slate-400">Prepared by concierge</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-300" />
                  <div>
                    <p className="text-sm font-medium text-slate-400">Premium Insurance</p>
                    <p className="text-xs text-slate-400">Issued before departure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-sm tracking-widest uppercase text-white/60 mb-6 font-medium">Your Concierge</h3>
            <div className="flex items-center gap-4 mb-6">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" alt="Concierge" className="w-16 h-16 rounded-full object-cover border-2 border-white/20" />
              <div>
                <p className="font-medium text-lg">Sarah Jenkins</p>
                <p className="text-white/60 text-sm">Senior Travel Director</p>
              </div>
            </div>
            <button className="w-full bg-white text-slate-900 py-3 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-slate-100 transition-colors mb-3">
              WhatsApp Sarah
            </button>
            <p className="text-xs text-white/40 text-center font-light">Available 24/7 for any requests.</p>
          </div>

        </div>
      </div>
    </div>
  );
};
