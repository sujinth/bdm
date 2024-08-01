
import { getServerSession } from 'next-auth';
import { LayoutProvider } from './contexts/layoutContext';
import Wrapper from './sessionWrapper'
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script'

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async  function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
    <head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="stylesheet" href="https://www.scmibusiness.co.uk/css/calendar.css" />
      <link rel="stylesheet" href="https://www.scmibusiness.co.uk/css/jquery-ui.css" />
      <Script src="https://www.scmibusiness.co.uk/js/jquery-1.11.0.min.js" />
      <Script src="https://www.scmibusiness.co.uk/js/jquery-1.10.2.js" strategy='afterInteractive' />
      <Script src="https://www.scmibusiness.co.uk/js/jquery-ui.js"/>
      <Script src="https://www.scmibusiness.co.uk/js/tabcontent.js" strategy='afterInteractive'/>
    </head>
    <body>
        <Wrapper session={session}>
          <LayoutProvider>
              {children}
          </LayoutProvider>
        </Wrapper>
    </body>
    </html>
  );
}
