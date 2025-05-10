import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import OrderService from './pages/OrderService';
import MyRequests from './pages/MyRequests';
import MyDeliverables from './pages/MyDeliverables';
import Invoices from './pages/Invoices';
import Upsell from './pages/Upsell';
import Support from './pages/Support';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/order-service" element={<OrderService />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/my-deliverables" element={<MyDeliverables />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/upsell" element={<Upsell />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;