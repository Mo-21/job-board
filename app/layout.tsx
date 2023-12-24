import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Box, Theme } from "@radix-ui/themes";
import "./globals.css";
import Navbar from "./Navbar";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme appearance="light" grayColor="sand">
          <AuthProvider>
            <main>
              <Navbar />
              <Box>{children}</Box>
            </main>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
