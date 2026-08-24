import React, { useState } from 'react';
import { Search, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { packages, formatIDR, testimonials } from '../data';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-8"
          >
            Curated Elegance.<br/>Unforgettable Escapes.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 flex items-center max-w-2xl mx-auto"
          >
            <Search className="w-6 h-6 ml-4 text-white/70" />
            <input 
              type="text" 
              placeholder="Where do you want to escape?" 
              className="flex-1 bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-white/60 font-light text-lg"
            />
            <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-medium tracking-widest uppercase text-sm hover:bg-slate-100 transition-colors">
              Discover
            </button>
          </motion.div>
        </div>
      </section>

      {/* Curated Collection */}
      <section className="py-24 px-6 lg:px-12 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm tracking-widest uppercase text-slate-500 mb-4">The Collection</h2>
              <h3 className="text-4xl md:text-5xl font-light text-slate-900">Curated Experiences</h3>
            </div>
            <p className="text-slate-600 font-light max-w-md leading-relaxed">
              We present only a handful of exceptional journeys each season. No endless scrolling, just the absolute pinnacle of luxury travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg, index) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer flex flex-col"
                onClick={() => onNavigate({ name: 'package', packageId: pkg.id })}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                  <img 
                    src={pkg.heroImage} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                    <div>
                      <p className="text-xs tracking-widest uppercase mb-2 opacity-90">{pkg.location}</p>
                      <p className="text-lg font-medium">{pkg.duration}</p>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-2xl font-light text-slate-900 mb-3">{pkg.title}</h4>
                <p className="text-slate-600 font-light leading-relaxed mb-6 flex-1">
                  {pkg.shortDescription}
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-slate-500 mb-1">Starting from</p>
                    <p className="text-lg font-medium text-slate-900">{formatIDR(pkg.price)}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-widest uppercase text-slate-500 mb-4">Client Voices</h2>
            <h3 className="text-4xl md:text-5xl font-light text-slate-900">Echoes of Excellence</h3>
          </div>

          <div className="relative max-w-5xl mx-auto bg-[#FDFBF7] rounded-3xl p-8 md:p-16 border border-slate-100 shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-center gap-12"
              >
                <div className="w-40 h-40 md:w-64 md:h-64 flex-shrink-0">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-slate-900 text-slate-900" />
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl font-light text-slate-900 leading-relaxed mb-8 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                  <div>
                    <h4 className="text-lg font-medium text-slate-900">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm tracking-widest uppercase text-slate-500 mt-1">{testimonials[currentTestimonial].occupation}</p>
                    <p className="text-sm text-slate-400 mt-1">Traveled to: <span className="text-slate-600 font-medium">{testimonials[currentTestimonial].destination}</span></p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10">
              <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10">
              <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Section */}
      <section className="py-24 px-6 lg:px-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Don't see what you're looking for?<br />
              Let's craft it.
            </h2>
            <p className="text-slate-400 font-light text-lg leading-relaxed max-w-xl">
              For those who demand absolute exclusivity, our concierge team is ready to design a fully bespoke itinerary from a blank canvas. Your imagination is the only limit.
            </p>
            <button 
              onClick={() => onNavigate({ name: 'custom_request' })}
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-medium tracking-widest uppercase text-sm hover:bg-slate-100 transition-colors inline-flex items-center gap-3"
            >
              Request Custom Trip <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2694&auto=format&fit=crop" className="w-full h-64 object-cover rounded-2xl" alt="Bespoke luxury 1" />
            <img src="https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2670&auto=format&fit=crop" className="w-full h-64 object-cover rounded-2xl mt-8" alt="Bespoke luxury 2" />
          </div>
        </div>
      </section>
    </div>
  );
};
