import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import '../styles/prism.css'
import { ThemeProviders } from "./providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk ",
});

export const metadata: Metadata = {
  title: "Task App",
  description:
    "A simple and efficient task management app to help you track your tasks, set priorities, and stay organized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <head>
        <link rel="icon" href="/assets/images/completed-task.png" />
        </head>
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} custom-scrollbar`}
        >
          <ThemeProviders>
            {children}</ThemeProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
