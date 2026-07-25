import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import ScrollTop from './ScrollTop';

export default function Layout({ children, showFooter = false, minimalNav = false }) {
  return (
    <>
      <Navbar minimal={minimalNav} />
      {children}
      {showFooter && <Footer />}
      <CartDrawer />
      <WishlistDrawer />
      <ScrollTop />
    </>
  );
}
