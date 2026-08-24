import React from 'react';
import { ArrowLeft, FileText, CheckCircle, Clock, Plane, Download, MessageCircle } from 'lucide-react';
import { ViewState } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FDFBF7] flex-1 flex flex-col">
      {/* Header */}
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
              <p className="text-white/60 tracking-widest uppercase text-sm mb-2">Welcome Back</p>
              <h1 className="text-4xl md:text-5xl font-light">Alexander Sterling</h1>
            </div>
            <div className="flex gap-4">
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full text-sm tracking-widest uppercase flex items-center gap-2 transition-colors">
                <MessageCircle className="w-4 h-4" /> Contact Concierge
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-12 w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Trip */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-start">
              <div>
                <p className="text-xs tracking-widest uppercase text-slate-500 mb-1">Upcoming Journey</p>
                <h2 className="text-2xl font-light text-slate-900">Swiss Alps Winter Retreat</h2>
                <p className="text-slate-600 font-light mt-1">Zermatt, Switzerland • Dec 15 - 21, 2026</p>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase border border-emerald-100">
                Confirmed
              </div>
            </div>
            
            <div className="p-8 bg-slate-50/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-4xl font-light text-slate-900 mb-1">112</p>
                  <p className="text-xs tracking-widest uppercase text-slate-500">Days</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-4xl font-light text-slate-900 mb-1">14</p>
                  <p className="text-xs tracking-widest uppercase text-slate-500">Hours</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-4xl font-light text-slate-900 mb-1">30</p>
                  <p className="text-xs tracking-widest uppercase text-slate-500">Minutes</p>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
                  <Plane className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-xs tracking-widest uppercase text-slate-500">Until Departure</p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100">
              <h3 className="text-sm tracking-widest uppercase text-slate-900 mb-6 font-medium">Trip Checklist</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Deposit Payment</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Passport Verification</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-500">Dietary Preferences Form</p>
                    <button className="text-xs uppercase tracking-widest font-medium text-slate-900 underline">Complete Now</button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0">
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-500">Final Payment (Due Nov 15)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* Documents */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-sm tracking-widest uppercase text-slate-900 mb-6 font-medium">Travel Documents</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-slate-400 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">E-Ticket (First Class)</p>
                    <p className="text-xs text-slate-500">CGK - GVA</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-slate-400 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Visa Shengen</p>
                    <p className="text-xs text-slate-500">Approved • Valid till 2028</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-slate-400 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Premium Insurance</p>
                    <p className="text-xs text-slate-500">Policy #INS-99281</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
            </div>
          </div>

          {/* Concierge Info */}
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
