import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentWise - AI Powered Dental Assistant",
  description:
    "Get instant dental advice through voice calls with our AI assistant. Avaiable 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#00D2FF",
            colorBackground: "#070815",
            colorText: "#E4E4E7",
            colorTextSecondary: "#A1A1AA",
            colorInputBackground: "#0c0f22",
            colorBorder: "#1e2040",
            colorDanger: "#ef4444",
            colorSuccess: "#10b981",
            colorWarning: "#f59e0b",
            borderRadius: "0.75rem",
            fontFamily: "var(--font-geist-sans)",
          },
          elements: {
            formButtonPrimary: {
              backgroundColor: "#00D2FF",
              color: "#070815",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#00B8E6",
              },
            },
            card: {
              backgroundColor: "#0c0f22",
              border: "1px solid #1e2040",
              boxShadow: "0px 1px 4px 0px hsl(0 0% 0% / 0.2), 0px 4px 6px -1px hsl(0 0% 0% / 0.15)",
            },
            headerTitle: {
              color: "#E4E4E7",
            },
            headerSubtitle: {
              color: "#A1A1AA",
            },
            socialButtonsBlockButton: {
              backgroundColor: "#0c0f22",
              border: "1px solid #1e2040",
              color: "#E4E4E7",
              "&:hover": {
                backgroundColor: "#161830",
              },
            },
            dividerLine: {
              backgroundColor: "#1e2040",
            },
            dividerText: {
              color: "#A1A1AA",
            },
            formFieldLabel: {
              color: "#E4E4E7",
            },
            formFieldInput: {
              backgroundColor: "#0c0f22",
              border: "1px solid #1e2040",
              color: "#E4E4E7",
              "&:focus": {
                borderColor: "#00D2FF",
                boxShadow: "0 0 0 1px #00D2FF",
              },
            },
            footer: {
              backgroundColor: "transparent",
            },
          },
        }}
      >
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
            {/* this is done in the home page component */}
            {/* <UserSync /> */}
            {children}
          </body>
        </html>
      </ClerkProvider>
  );
}