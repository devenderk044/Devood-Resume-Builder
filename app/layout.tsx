import './globals.css';

export const metadata = {
  title: 'Dev Resume Builder',
  description: 'Next.js Resume Builder',
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
