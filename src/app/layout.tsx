"use client"
import { store } from "@/features/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/Sidebar";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <head>
        <title>Yamm Dashboard</title> 
        <meta name="description" content="Manage your refund orders efficiently with Yamm Dashboard." />
        <link rel="icon" href="/images/trolley.ico" />
      </head>
      <body className="flex overflow-hidden">
        <Provider store={store}>
          <Sidebar />
          <main className="flex-1 p-6 ml-20  transition-all duration-300 overflow-x-hidden">
            {children}
          </main>
          <Toaster position="top-right" />
        </Provider>
      </body>
    </html>
  );
}
