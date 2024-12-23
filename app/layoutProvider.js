"use client";

import { usePathname } from 'next/navigation';
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import SigninModal from "./cart/components/ui/signinModal";
import TopLoader from './components/ui/topLoader';

export default function LayoutProvider({ children }) {
  const pathname = usePathname();
  
  // Conditionally display global components (Header, Footer) based on the pathname
  const showGlobalComp = !(pathname.startsWith("/cart") || pathname.startsWith("/checkout"));

  return (
    <>
      <TopLoader />
      <div className={`${showGlobalComp ? 'pt-16 md:pt-28' : ''}`}>
        {showGlobalComp && <Header />}
        {children}
        <SigninModal />
        {showGlobalComp && <Footer />}
      </div>
    </>
  );
}