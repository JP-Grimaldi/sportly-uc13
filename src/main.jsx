// Ponto de entrada da aplicacao: registra as rotas e monta a arvore de componentes.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Header from "./components/Header";
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile'
import Loja from './pages/Loja';
import Footer from './components/Footer';
import FooterMobile from './components/FooterMobile';

import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      {/* Header fica fixo no topo de todas as paginas */}
      <Header />

      {/* Cada rota abaixo corresponde a uma pagina do site */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/productDetail/:id_produto" element={<ProductDetail />} />
        
      </Routes>

      {/* Rodapes: um para desktop, outro para mobile */}
      <Footer />
      <FooterMobile />

    </BrowserRouter>
  </StrictMode>
);
