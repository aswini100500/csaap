// Layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../BuilderErp/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This will render the matched child route component */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;