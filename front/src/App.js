// src/App.js
import React from 'react';
import './App.css';
import { Menu } from './components/Menu';
import { Inicio } from './components/Inicio';
import { Footer } from './components/Footer';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Veterinarios from './components/veterinario/Veterinarios';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import ListaVeterinariosReadOnly from './components/veterinario/ListaVeterinariosReadOnly';

const App = () => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <AuthProvider>
          <Menu />
          <div className="main-content">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/veterinarios/lista"
                element={
                  <ProtectedRoute roles={["miembro"]}>
                    <ListaVeterinariosReadOnly />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/veterinarios/admin"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <Veterinarios />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </NavigationProvider>
    </BrowserRouter>
  );
};

export default App;