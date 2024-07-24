import InnerHeader from"../components/commen/InnerHeader/Header";
import Footer from"../components/commen/Footer/Footer";
import { DashboardProvider } from '../contexts/dashboardContext';

export default function DashboardPageLayout({ children }) {
  return (
    <>
      <DashboardProvider>
        <InnerHeader/>{children} <Footer/>
      </DashboardProvider>
    </>
  );
}
