import { Inter } from "next/font/google";
import '../styles/layout.css'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="background">
      <div className="bgImage">
        <img src="https://www.pngall.com/wp-content/uploads/13/Grid-PNG-File.png" />
      </div>
        {children}
      </body>
    </html>
  );
}
