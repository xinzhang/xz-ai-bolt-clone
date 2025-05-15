import Provider from "./provider";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: "Bolt.new Clone",
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
            <div className='min-h-screen bg-background text-foreground antialiased'>
              <Header />
              {children}
            </div>
          </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
