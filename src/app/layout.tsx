import { ThemeProvider } from '@/components/common/theme-provider';
import { SidebarProvider } from "@/components/ui/sidebar";
import Provider from '@/redux/provider';
import { Setup } from '@/utils';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NCHE IMIS",
  description: "Uganda's National Council for Higher Education Information Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //className="h-full bg-white"
    <html lang="en" dir='ltr' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased [--header-height:calc(--spacing(14))]`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <Provider>
        <Setup />
        <SidebarProvider className="flex flex-col">
        {children}
        </SidebarProvider>
      </Provider>
      </ThemeProvider>
      </body>
    </html>
  );
}
