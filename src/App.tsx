/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { PackageDetail } from './components/PackageDetail';
import { BookingFlow } from './components/BookingFlow';
import { Dashboard } from './components/Dashboard';
import { CustomRequest } from './components/CustomRequest';
import { Admin } from './components/Admin';
import { PaymentReturn } from './components/PaymentReturn';
import { ViewState, Order } from './types';

function readHashRoute(hash: string): ViewState | null {
  const match = hash.match(/^#\/payment_return\/(.+)$/);
  if (match) return { name: 'payment_return', orderId: match[1] };
  return null;
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const fromHash = readHashRoute(window.location.hash);
    return fromHash ?? { name: 'home' };
  });
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView.name]);

  useEffect(() => {
    const onHashChange = () => {
      const fromHash = readHashRoute(window.location.hash);
      if (fromHash) setCurrentView(fromHash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderView = () => {
    switch (currentView.name) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'package':
        return <PackageDetail packageId={currentView.packageId} onNavigate={setCurrentView} />;
      case 'booking':
        return (
          <BookingFlow
            packageId={currentView.packageId}
            onNavigate={setCurrentView}
            onOrderCreated={setLatestOrder}
          />
        );
      case 'dashboard':
        return <Dashboard order={latestOrder} onNavigate={setCurrentView} />;
      case 'custom_request':
        return <CustomRequest onNavigate={setCurrentView} />;
      case 'admin':
        return <Admin onNavigate={setCurrentView} />;
      case 'payment_return':
        return <PaymentReturn orderId={currentView.orderId} onNavigate={setCurrentView} />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}
