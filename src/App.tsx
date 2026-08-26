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
import { ViewState, Order } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>({ name: 'home' });
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView.name]);

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
