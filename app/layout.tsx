import "./globals.css";
import { Inter } from "next/font/google";

import { Providers } from "./providers";
import Nav from "./components/navigation";
import { CurrentUserProvider } from "./current-user";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
  description: "Track your money",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CurrentUserProvider>
            <Nav />
            {children}
          </CurrentUserProvider>
        </Providers>
      </body>
    </html>
  );
}
