// File: app/layout.js

export const metadata = {
  title: "Abdul Sami's Portfolio",
  description: "A passionate software engineer's portfolio",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

// This imports the client layout wrapper with animations
import LayoutWrapper from "./layout-wrapper";

