import React from 'react';
import { Compass, Menu, X, User, LogOut } from 'lucide-react';
import { ViewState } from '../types';
import { AuthModal } from './AuthModal';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [user, setUser] = React.useState<SupabaseUser | null>(null);

  React.useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setUser(data.session?.user ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false);
  };

  const navigateAndClose = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <button 
            onClick={() => navigateAndClose({ name: 'home' })}
            className="flex items-center gap-3 group"
          >
            <Compass className="w-8 h-8 text-slate-900 group-hover:rotate-45 transition-transform duration-500" strokeWidth={1.5} />
            <span className="text-2xl font-light tracking-widest uppercase">LuxVoyage</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => navigateAndClose({ name: 'custom_request' })}
              className="text-sm tracking-widest uppercase hover:text-slate-500 transition-colors"
            >
              Custom Escapes
            </button>
            <button
              onClick={() => navigateAndClose({ name: 'admin' })}
              className="text-xs tracking-widest uppercase text-slate-400 hover:text-slate-700 transition-colors"
            >
              Admin
            </button>
            {user ? (
              <>
                <button
                  onClick={() => navigateAndClose({ name: 'dashboard' })}
                  className="flex items-center gap-2 text-sm tracking-widest uppercase hover:text-slate-500 transition-colors"
                  title={user.email ?? 'Account'}
                >
                  <span className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-medium">
                    {(user.email ?? '?').charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[10rem] truncate font-normal normal-case tracking-normal text-slate-600 text-sm">
                    {user.email}
                  </span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-xs tracking-widest uppercase text-slate-400 hover:text-slate-900 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 text-sm tracking-widest uppercase bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-slate-800 transition-colors"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-[#FDFBF7] border-b border-slate-200/50 flex flex-col px-6 py-8 gap-6 shadow-xl">
            <button
              onClick={() => navigateAndClose({ name: 'custom_request' })}
              className="text-left text-lg tracking-widest uppercase hover:text-slate-500 transition-colors"
            >
              Custom Escapes
            </button>
            <button
              onClick={() => navigateAndClose({ name: 'admin' })}
              className="text-left text-sm tracking-widest uppercase text-slate-400 hover:text-slate-700 transition-colors"
            >
              Admin
            </button>
            {user ? (
              <>
                <div className="text-xs text-slate-500 normal-case tracking-normal font-light">
                  Signed in as <span className="text-slate-900 font-medium">{user.email}</span>
                </div>
                <button
                  onClick={() => navigateAndClose({ name: 'dashboard' })}
                  className="flex items-center justify-center gap-2 text-lg tracking-widest uppercase bg-slate-900 text-white px-6 py-4 rounded-full"
                >
                  <User className="w-5 h-5" />
                  Client Portal
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 text-sm tracking-widest uppercase border border-slate-300 text-slate-700 px-6 py-4 rounded-full"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 text-lg tracking-widest uppercase bg-slate-900 text-white px-6 py-4 rounded-full"
              >
                <User className="w-5 h-5" />
                Sign In
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 lg:px-12 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6 text-white">
              <Compass className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-xl font-light tracking-widest uppercase">LuxVoyage</span>
            </div>
            <p className="max-w-md font-light leading-relaxed">
              Curating the world's most extraordinary travel experiences for those who seek the exceptional. We don't sell trips; we craft legacies.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center">
            <div className="space-y-4 font-light tracking-widest uppercase text-sm">
              <p>Concierge: +62 811-1234-5678</p>
              <p>Email: private@luxvoyage.com</p>
              <p>Jakarta • Geneva • Tokyo</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-xs font-light tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} LuxVoyage. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
