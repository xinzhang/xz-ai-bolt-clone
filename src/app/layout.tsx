import Provider from "./provider";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ConvexClientProvider from "./ConvexClientProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

export const metadata: Metadata = {
  title: "Bolt.clone",
  description: "To show how to build a clone of Bolt.new",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <Provider>
            <SidebarProvider defaultOpen={false}>
              <div className='w-full'>
                <Header />

                <AppSidebar />
                {children}
              </div>
            </SidebarProvider>
          </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
