import React, { useState } from 'react';
import { ArrowLeft, Check, Calendar, CreditCard, ChevronRight, MessageSquare } from 'lucide-react';
import { packages, formatIDR } from '../data';
import { ViewState } from '../types';

interface BookingFlowProps {
  packageId: string;
  onNavigate: (view: ViewState) => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({ packageId, onNavigate }) => {
  const pkg = packages.find(p => p.id === packageId);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!pkg) return null;

  const totalUpgrades = pkg.upgrades
    .filter(u => selectedUpgrades.includes(u.id))
    .reduce((sum, u) => sum + u.price, 0);
    
  const totalPrice = pkg.price + totalUpgrades;
  const dpAmount = totalPrice * 0.3; // 30% DP

  const handleUpgradeToggle = (id: string) => {
    setSelectedUpgrades(prev => 
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onNavigate({ name: 'dashboard' });
    }, 2000);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-[calc(100vh-6rem)] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => onNavigate({ name: 'package', packageId: pkg.id })}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Package
        </button>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-10"></div>
          
          {[
            { num: 1, label: 'Trip Details', icon: Calendar },
            { num: 2, label: 'Guest Info', icon: Check },
            { num: 3, label: 'Secure Payment', icon: CreditCard }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-3 bg-[#FDFBF7] px-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                step >= s.num ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-400'
              }`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs tracking-widest uppercase font-medium ${step >= s.num ? 'text-slate-900' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Form Area */}
          <div className="lg:col-span-7">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-light">Customize Your Experience</h2>
                
                <div className="space-y-4">
                  <label className="block text-sm font-medium tracking-widest uppercase text-slate-500">Select Preferred Start Date</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors text-lg"
                  />
                </div>

                <div className="space-y-4 pt-6">
                  <label className="block text-sm font-medium tracking-widest uppercase text-slate-500">Select Upgrades (Optional)</label>
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
                      <div>
                        <h4 className="font-medium text-slate-900 mb-1">{upgrade.title}</h4>
                        <p className="text-sm text-slate-500 font-light mb-3">{upgrade.description}</p>
                        <p className="text-sm font-medium text-slate-900">+{formatIDR(upgrade.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  disabled={!formData.date}
                  onClick={() => setStep(2)}
                  className="w-full bg-slate-900 text-white py-4 rounded-full tracking-widest uppercase text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue to Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-light">Lead Guest Information</h2>
                <p className="text-slate-500 font-light">Your dedicated concierge will use this to coordinate your travel documents and preferences.</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">Full Name (As in Passport)</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium tracking-widest uppercase text-slate-500 mb-2">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 outline-none focus:border-slate-900 transition-colors"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="px-8 py-4 rounded-full tracking-widest uppercase text-sm font-medium text-slate-900 bg-slate-200 hover:bg-slate-300 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    disabled={!formData.name || !formData.email || !formData.phone}
                    onClick={() => setStep(3)}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-full tracking-widest uppercase text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Proceed to Payment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-light">Secure Reservation</h2>
                <p className="text-slate-500 font-light">A 30% deposit is required to secure your dates. The remaining balance will be coordinated by your concierge.</p>
                
                <div className="bg-white p-8 rounded-3xl border border-slate-200">
                  <h3 className="text-lg font-medium mb-6">Payment Method</h3>
                  
                  <div className="space-y-4 mb-8">
                    <label className="flex items-center gap-4 p-4 border-2 border-slate-900 rounded-xl bg-slate-50 cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-slate-900" />
                      <div className="flex-1">
                        <p className="font-medium">Credit Card (Premium)</p>
                        <p className="text-sm text-slate-500">Visa Infinite, Mastercard World Elite, AMEX</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-slate-400">
                      <input type="radio" name="payment" className="w-4 h-4 text-slate-900" />
                      <div className="flex-1">
                        <p className="font-medium">Bank Transfer (Virtual Account)</p>
                        <p className="text-sm text-slate-500">BCA, Mandiri, BNI, Priority Banking</p>
                      </div>
                    </label>
                  </div>

                  {/* Mock CC Input */}
                  <div className="space-y-4">
                    <input type="text" placeholder="Card Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900" />
                    <div className="flex gap-4">
                      <input type="text" placeholder="MM/YY" className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900" />
                      <input type="text" placeholder="CVC" className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 outline-none focus:border-slate-900" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="px-8 py-4 rounded-full tracking-widest uppercase text-sm font-medium text-slate-900 bg-slate-200 hover:bg-slate-300 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={simulatePayment}
                    disabled={isProcessing}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-full tracking-widest uppercase text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? 'Processing...' : `Pay Deposit ${formatIDR(dpAmount)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
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

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-slate-500 tracking-widest uppercase text-xs">Total Investment</span>
                  <span className="text-xl font-medium">{formatIDR(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-900 font-medium">Deposit Due (30%)</span>
                  <span className="text-2xl font-medium text-slate-900">{formatIDR(dpAmount)}</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 flex items-start gap-3 border border-emerald-100">
                <MessageSquare className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 font-light">
                  Upon deposit payment, a dedicated concierge will contact you via WhatsApp within 15 minutes to coordinate your exact itinerary and document requirements.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
