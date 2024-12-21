import CartHeader from "../../../cart/components/cartHeader";
import "../../../globals.css";
import ReduxProvider from "../../../cart/ReduxProvider";
import SecurePayment from "@/app/cart/components/ui/securePayment";

export const metadata = {
  title: "Checkout Page",
  description: "Developed by Irfan",
};

export default function CartLayout({ children }) {
  return (
    <>
      <ReduxProvider>
        <CartHeader />
        {children}
        <SecurePayment />
      </ReduxProvider>
    </>
  );
}
