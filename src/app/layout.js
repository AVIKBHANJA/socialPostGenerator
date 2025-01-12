// src/app/layout.js
export const metadata = {
  title: 'Social Media Post Generator',
  description: 'Generate SEO-friendly content for your social media posts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}