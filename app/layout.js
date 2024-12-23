import { Roboto } from 'next/font/google'
import "./globals.css";
import LayoutProvider from "./layoutProvider";
import LoadCart from './cart/components/lib/loadCart';
import ReduxProvider from './cart/ReduxProvider';

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
          <ReduxProvider>
            <LayoutProvider>
              <LoadCart/>
              {children}
            </LayoutProvider>
          </ReduxProvider>
      </body>
    </html>
  );
}
