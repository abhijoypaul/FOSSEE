import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import TopNav from './components/TopNav';
import TabBar from './components/TabBar';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import WorkshopsPage from './pages/WorkshopsPage';
import ProposePage from './pages/ProposePage';
import StatusPage from './pages/StatusPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function Shell() {
  const { user } = useApp();
  const [page, setPage] = useState('home');
  const [proposePrefill, setProposePrefill] = useState(null);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropose = (workshopType) => {
    setProposePrefill(workshopType);
    navigate('propose');
  };

  // Auth-only pages — no shell chrome
  if (page === 'login') {
    return (
      <>
        <LoginPage
          onSuccess={() => navigate('home')}
          onRegister={() => navigate('register')}
        />
        <Toast />
      </>
    );
  }

  if (page === 'register') {
    return (
      <>
        <RegisterPage
          onSuccess={() => navigate('home')}
          onLogin={() => navigate('login')}
        />
        <Toast />
      </>
    );
  }

  // Main app shell
  const isGuest = !user;

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'workshops':
        return <WorkshopsPage onPropose={handlePropose} />;
      case 'propose':
        return (
          <ProposePage
            prefillType={proposePrefill}
            onSuccess={() => { setProposePrefill(null); navigate('status'); }}
          />
        );
      case 'status':
        return <StatusPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-shell">
      <TopNav onProfileClick={() => navigate(user ? 'profile' : 'login')} />
      <main className="main-content" id="main-content">
        {renderPage()}
      </main>
      <TabBar
        active={page}
        onChange={(tab) => {
          if ((tab === 'propose' || tab === 'status' || tab === 'profile') && !user) {
            navigate('login');
          } else {
            navigate(tab);
          }
        }}
        isGuest={isGuest}
      />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
