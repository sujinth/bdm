import { Suspense } from 'react'
import InnerHeader from"../components/commen/InnerHeader/Header";
import Footer from"../components/commen/Footer/Footer";

export default function DashboardPageLayout({ children }) {
  return (
    <>
        <InnerHeader/>
        {children} 
        <Footer/>
    </>
  );
}
