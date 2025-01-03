import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartHeader from "./components/cartHeader";
import "../globals.css";
import ReduxProvider from "./ReduxProvider";

export const metadata = {
  title: "Cart Page",
  description: "Developed by Irfan",
};

export default function CartLayout({ children }) {
  return (
    <>
      <ReduxProvider>
        <CartHeader />
        {children}
      </ReduxProvider>
      <ToastContainer/>
    </>
  );
}
