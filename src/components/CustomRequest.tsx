import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Send } from 'lucide-react';
import { ViewState } from '../types';

interface CustomRequestProps {
  onNavigate: (view: ViewState) => void;
}

export const CustomRequest: React.FC<CustomRequestProps> = ({ onNavigate }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onNavigate({ name: 'home' });
    }, 4000);
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-1000">
        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-8">
          <Send className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-light mb-4 text-slate-900">Request Received</h2>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
          Your private concierge will review your preliminary requirements and contact you via WhatsApp within 15 minutes to begin crafting your bespoke itinerary.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] flex-1 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => onNavigate({ name: 'home' })}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Collection
        </button>

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Bespoke Escapes</h1>
          <p className="text-slate-600 font-light text-lg leading-relaxed">
            For those who desire an experience entirely crafted from a blank canvas. Please provide us with a starting point, and our senior directors will handle the rest.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">Full Name</label>
              <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">WhatsApp Number</label>
              <input required type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">Desired Destination(s)</label>
            <input required type="text" placeholder="e.g. Amalfi Coast, Patagonia, or 'Surprise me'" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">Estimated Travel Month</label>
              <input type="month" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">Party Size</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors appearance-none">
                <option>1-2 Guests</option>
                <option>3-5 Guests</option>
                <option>6-10 Guests (Small Group)</option>
                <option>10+ Guests</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">Specific Requirements or Dreams</label>
            <textarea 
              rows={4} 
              placeholder="e.g. Private yacht charter required, Michelin dining every night, focus on art history..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors resize-none"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400 font-light max-w-xs">
              * Minimum investment for fully bespoke itineraries begins at IDR 150,000,000.
            </p>
            <button 
              type="submit"
              className="bg-slate-900 text-white px-10 py-4 rounded-full tracking-widest uppercase text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              Submit Request <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
