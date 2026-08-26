import React, { useState, useEffect, FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Mode = 'signin' | 'signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => {
        setMode('signin');
        setEmail('');
        setPassword('');
        setName('');
        setError(null);
        setInfo(null);
        setLoading(false);
      }, 200);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setInfo(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
        onClose();
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: name.trim() },
          },
        });
        if (signUpError) throw signUpError;

        // If Supabase requires email confirmation, session will be null
        if (!data.session) {
          setInfo('Account created. Check your email to confirm, then sign in.');
          setMode('signin');
        } else {
          onClose();
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2
                id="auth-modal-title"
                className="text-2xl font-light text-slate-900 mb-2 tracking-wide"
              >
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-sm text-slate-500 font-light">
                {mode === 'signin'
                  ? 'Sign in to access your client portal'
                  : 'Join LuxVoyage for curated escapes'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 rounded-full p-1 mb-8">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2.5 text-xs tracking-widest uppercase rounded-full transition-colors ${
                  mode === 'signin'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2.5 text-xs tracking-widest uppercase rounded-full transition-colors ${
                  mode === 'signup'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Register
              </button>
            </div>

            {/* Info message (e.g. email confirmation required) */}
            {info && (
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-6">
                <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 font-light">{info}</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 font-light">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    autoComplete="name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-5 py-3.5 outline-none focus:border-slate-900 transition-colors text-sm"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-5 py-3.5 outline-none focus:border-slate-900 transition-colors text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 6 chars)"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-5 py-3.5 outline-none focus:border-slate-900 transition-colors text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-3.5 rounded-full text-xs tracking-widest uppercase font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>{mode === 'signin' ? 'Sign In' : 'Create Account'}</>
                )}
              </button>
            </form>

            {/* Footer link */}
            <p className="text-center text-xs text-slate-400 font-light mt-6">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-slate-900 font-medium hover:underline"
              >
                {mode === 'signin' ? 'Register' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
