import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'OpsWired Dispatch OS (Speedoo Fleet Edition)',
  description: 'Logistics Dispatch & Payout Engine engineered by OpsWired / Kareem Kreations — Deployed for Speedoo Qatar',
  icons: {
    icon: '/brand/logo-mark.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
