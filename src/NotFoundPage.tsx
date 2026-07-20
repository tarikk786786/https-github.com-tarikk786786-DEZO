import React, { useEffect } from 'react';
import { Home, Zap, MessageSquare, Phone } from 'lucide-react';

export const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Page Not Found | Dezo";
  }, []);

  return (
    <main className="min-h-screen bg-main-dark flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg">
          <Zap size={36} className="text-white" />
        </div>
        <h1 className="text-7xl font-black text-main-light mb-4">404</h1>
        <p className="text-xl font-bold text-main-muted mb-2">This page is missing, but your digital growth journey is still alive.</p>
        <p className="text-sm text-main-muted mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/" className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-full hover:-translate-y-0.5 smooth-transition">
            <Home size={16} />Go Home
          </a>
          <a href="/#services" className="flex items-center gap-2 px-6 py-3 border border-main-light text-main-muted font-bold rounded-full hover:border-[var(--primary)] smooth-transition">
            <MessageSquare size={16} />View Services
          </a>
          <a href="/#contact" className="flex items-center gap-2 px-6 py-3 border border-main-light text-main-muted font-bold rounded-full hover:border-[var(--primary)] smooth-transition">
            <Phone size={16} />Contact Dezo
          </a>
          <a href="https://wa.me/917787063088" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-full hover:-translate-y-0.5 smooth-transition">
            <MessageSquare size={16} />WhatsApp Us
          </a>
        </div>
      </div>
    </main>
  );
};
