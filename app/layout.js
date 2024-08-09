//////////////////////////////////////////////////////////////////////////////////
//                                                                              //
//                   File for wrap components with the layout                   //
//                                                                              //
//////////////////////////////////////////////////////////////////////////////////

import { getServerSession } from "next-auth";
import { LayoutProvider } from "./contexts/layoutContext";
import { PopupProvider } from "./contexts/popupContext";
import Popup from "./components/commen/Popup/Popup";
import Wrapper from "./sessionWrapper";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";

// Exporting meta data
export const metadata = {
  title: "Santander Consumer Finance",
  description: "Santander Consumer Finance",
};

// Exporting root layout component
export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link
          rel="stylesheet"
          href="https://www.scmibusiness.co.uk/css/calendar.css"
        />
        <link
          rel="stylesheet"
          href="https://www.scmibusiness.co.uk/css/jquery-ui.css"
        />
        <Script src="https://www.scmibusiness.co.uk/js/jquery-1.11.0.min.js" />
        <Script
          src="https://www.scmibusiness.co.uk/js/jquery-1.10.2.js"
          strategy="afterInteractive"
        />
        <Script src="https://www.scmibusiness.co.uk/js/jquery-ui.js" />
        <Script
          src="https://www.scmibusiness.co.uk/js/tabcontent.js"
          strategy="afterInteractive"
        />
        <Script src="https://www.scmibusiness.co.uk/js/jquery.ui.touch-punch.min.js" />
      </head>
      <body>
        <Wrapper session={session}>
          <LayoutProvider>
            <PopupProvider>
              <Popup />
              {children}
            </PopupProvider>
          </LayoutProvider>
        </Wrapper>
      </body>
    </html>
  );
}
