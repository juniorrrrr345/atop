import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShowcasePage from './pages/ShowcasePage';
import InfosPage from './pages/InfosPage';
import SocialPage from './pages/SocialPage';
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/infos" element={<InfosPage />} />
          <Route path="/reseaux" element={<SocialPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/product/:id" element={<ProductDetailPage productId={1} onBack={() => window.history.back()} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;