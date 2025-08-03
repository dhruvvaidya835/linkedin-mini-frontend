import './globals.css';

export const metadata = {
  title: 'LinkedIn Mini',
  description: 'A community platform like LinkedIn',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
