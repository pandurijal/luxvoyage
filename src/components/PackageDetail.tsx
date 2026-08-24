import React from 'react';
import { ArrowLeft, Check, Plus, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { packages, formatIDR } from '../data';
import { ViewState } from '../types';

interface PackageDetailProps {
  packageId: string;
  onNavigate: (view: ViewState) => void;
}

export const PackageDetail: React.FC<PackageDetailProps> = ({ packageId, onNavigate }) => {
  const pkg = packages.find(p => p.id === packageId);

  if (!pkg) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        <h2 className="text-2xl font-light mb-4">Package not found</h2>
        <button onClick={() => onNavigate({ name: 'home' })} className="text-slate-500 hover:text-slate-900 underline">Return Home</button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] flex flex-col">
      {/* Hero Image */}
      <div className="relative h-[70vh] w-full">
        <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
        <div className="absolute top-8 left-6 lg:left-12 z-10">
          <button 
            onClick={() => onNavigate({ name: 'home' })}
            className="flex items-center gap-2 text-white bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-full text-sm hover:bg-slate-900/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </button>
        </div>
        <div className="absolute bottom-12 left-6 lg:left-12 right-6 lg:right-12 text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-6 mb-4 text-white/90 text-sm tracking-widest uppercase">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {pkg.location}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {pkg.duration}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight">{pkg.title}</h1>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 min-w-[280px]">
              <p className="text-xs tracking-widest uppercase mb-1 opacity-80">Starting From</p>
              <p className="text-3xl font-medium mb-6">{formatIDR(pkg.price)}</p>
              <button 
                onClick={() => onNavigate({ name: 'booking', packageId: pkg.id })}
                className="w-full bg-white text-slate-900 px-6 py-4 rounded-full font-medium tracking-widest uppercase text-sm hover:bg-slate-100 transition-colors"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-24">
          
          {/* Overview */}
          <section>
            <h2 className="text-3xl font-light text-slate-900 mb-6">The Experience</h2>
            <p className="text-xl text-slate-600 font-light leading-relaxed">
              {pkg.description}
            </p>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-xs tracking-widest uppercase text-slate-500 mb-8">Visuals</h2>
            <div className="grid grid-cols-2 gap-4">
              {pkg.gallery.map((img, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                  <img src={img} alt={`${pkg.title} gallery ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </section>

          {/* Itinerary */}
          <section>
            <h2 className="text-3xl font-light text-slate-900 mb-12">Curated Itinerary</h2>
            <div className="space-y-12">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-sm font-medium text-slate-500 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors">
                      {day.day}
                    </div>
                    <div className="w-px h-full bg-slate-200 mt-4 group-last:hidden"></div>
                  </div>
                  <div className="pb-12 group-last:pb-0">
                    <h3 className="text-xl font-medium text-slate-900 mb-3">{day.title}</h3>
                    <p className="text-slate-600 font-light leading-relaxed">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-12">
            
            {/* What's Included */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-medium text-slate-900 mb-6">What's Included</h3>
              <ul className="space-y-4">
                {pkg.included.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-slate-900" />
                    </div>
                    <span className="text-slate-600 font-light text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upgrades */}
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-6">Available Upgrades</h3>
              <div className="space-y-4">
                {pkg.upgrades.map((upgrade) => (
                  <div key={upgrade.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-400 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-900">{upgrade.title}</h4>
                      <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-light mb-4">{upgrade.description}</p>
                    <p className="text-sm font-medium text-slate-900">+{formatIDR(upgrade.price)}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-4 font-light italic">
                * Upgrades can be selected during the booking process.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
