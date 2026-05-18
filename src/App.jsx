import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import DocsLayout from './components/layout/DocsLayout';
import Introduction from './pages/docs/Introduction';
import QuickStart from './pages/docs/QuickStart';
import Configuration from './pages/docs/Configuration';
import APIReference from './pages/docs/APIReference';
import EmailFeatures from './pages/docs/EmailFeatures';
import ErrorHandling from './pages/docs/ErrorHandling';
import SecurityLogic from './pages/docs/SecurityLogic';
import MobileAuth from './pages/docs/MobileAuth';
import Microservices from './pages/docs/Microservices';
import EnvironmentVars from './pages/docs/EnvironmentVars';
import HooksDeepDive from './pages/docs/HooksDeepDive';
import RBACUseCase from './pages/docs/RBACUseCase';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Landing />} />

              {/* Documentation Routes */}              <Route path="/docs" element={<DocsLayout />}>
                <Route index element={<Introduction />} />
                <Route path="quick-start" element={<QuickStart />} />
                <Route path="configuration" element={<Configuration />} />
                <Route path="api-reference" element={<APIReference />} />
                <Route path="email-features" element={<EmailFeatures />} />
                <Route path="error-handling" element={<ErrorHandling />} />
                <Route path="security" element={<SecurityLogic />} />

                {/* Deep Dives */}
                <Route path="hooks" element={<HooksDeepDive />} />

                {/* Use Cases */}
                <Route path="use-cases/rbac" element={<RBACUseCase />} />
                <Route path="use-cases/mobile" element={<MobileAuth />} />
                <Route path="use-cases/microservices" element={<Microservices />} />     
                <Route path="env-vars" element={<EnvironmentVars />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
