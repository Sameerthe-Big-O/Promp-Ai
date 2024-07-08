import type { Metadata } from "next";
import "../styles/globals.css";
import Nav from '@/components/Nav';
import Proivder from '@/components/Provider';

import  { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & Share Ai Prompts",
};

export default function RootLayout({ children,}: Readonly<{  children: React.ReactNode}>) {
  return (
    <html lang="en">
    
      <body >
      <Proivder>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav/>
          {children}</main>
          <Toaster />
          </Proivder>
      </body>
     
    </html>
  );
}
