import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './components/AuthProvider';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import GmailCallback from './components/GmailCallback';
import OutlookCallback from './pages/OutlookCallback';
import Settings from './pages/Settings';
import Templates from './pages/Templates';
import Analytics from './pages/Analytics';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AuthCallback from './pages/AuthCallback';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gmail/callback" element={<GmailCallback />} />
          <Route path="/outlook/callback" element={<OutlookCallback />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* Catch-all route to handle unexpected deep-links or sandbox pathing issues */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}