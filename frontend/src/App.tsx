import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './pages/Home';
import Files from './pages/Files';
import Shared from './pages/Shared';
import Settings from './pages/Settings';
import ErrorBoundary from './components/ErrorBoundary';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2',
    },
    secondary: {
      main: '#34C759',
    },
    background: {
      default: '#F5F7FA',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/files" element={<Files />} />
              <Route path="/shared" element={<Shared />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
