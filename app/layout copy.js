import { Roboto } from 'next/font/google'
import "./globals.css";
import ReduxProvider from "./cart/ReduxProvider";
import LayoutProvider from "./layoutProvider";
import LoadCart from './cart/components/lib/loadCart';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

export const metadata = {
  title: "Giggs",
  description: "Best meat wesbite",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <LayoutProvider>
            <LoadCart/>
            {children}
          </LayoutProvider>
      </body>
    </html>
  );
}
