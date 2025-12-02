import type { Metadata } from 'next';
import 'ft-design-system/styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'FT Design System App',
  description: 'App using FT Design System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

