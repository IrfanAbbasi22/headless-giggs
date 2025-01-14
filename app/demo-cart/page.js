"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, CreditCard, Building2, Clock, Tag, Truck, Edit2 } from "lucide-react";
import Image from "next/image";
import Coupon from "./components/coupon";
import Address from "./components/address";

export default function Checkout() {
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("main"); // main, coupons, address

  const product = {
    name: "Stylux Ergonomic Office Chair",
    variant: "Black & Grey / High Back",
    price: 16999,
    image: "/chair.jpg"
  };

  const paymentMethods = [
    {
      id: "upi",
      name: "Pay via UPI",
      description: "Use any registered UPI ID",
      icon: "PhonePe",
    },
    {
      id: "card",
      name: "Debit/Credit cards",
      description: "Visa, Mastercard, RuPay & more",
      icon: CreditCard,
    },
    {
      id: "netbanking",
      name: "Netbanking",
      description: "Select from a list of banks",
      icon: Building2,
    },
    {
      id: "emi",
      name: "EMIs",
      description: "Pay with credit/debit card EMI & more",
      icon: Clock,
    }
  ];

  if (currentScreen === "coupons") {
    return <Coupon onBack={() => setCurrentScreen("main")} cartValue={product.price} />;
  }

  if (currentScreen === "address") {
    return (
      <Address 
        onBack={() => setCurrentScreen("main")} 
        onProceed={() => setCurrentScreen("main")} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white min-h-screen shadow-sm">
        {/* Header */}
        <header className="border-b">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-1">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-navy-700">
                    <rect width="10" height="10" x="2" y="2" className="fill-current"/>
                    <rect width="10" height="10" x="12" y="12" className="fill-current"/>
                  </svg>
                </div>
                <span className="font-semibold text-lg">THE SLEEP COMPANY</span>
              </div>
            </div>
            <span className="font-semibold">₹{product.price.toLocaleString()}</span>
          </div>
          <div className="bg-[#1B2A3B] text-white py-3 px-4 text-sm text-center">
            Enter your GST details if applicable
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Order Summary */}
          <div className="border rounded-lg">
            <button 
              onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
              className="w-full px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Order summary</span>
                <span className="text-sm text-gray-500">1 item</span>
              </div>
              {orderSummaryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {orderSummaryOpen && (
              <div className="px-4 pb-4 border-t">
                <div className="flex gap-3 py-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.variant}</p>
                    <p className="mt-1 font-medium">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Coupons */}
          <button 
            onClick={() => setCurrentScreen("coupons")}
            className="w-full border rounded-lg px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Coupons</span>
            </div>
            <ChevronDown className="w-5 h-5" />
          </button>

          {/* Delivery Address */}
          <div className="border rounded-lg">
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Delivery</span>
              </div>
              <button onClick={() => setCurrentScreen("address")}>
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            <div className="px-4 pb-3 text-sm text-gray-600">
              B114 Dwarka Mor New Delhi, Delhi, Delhi, India, 110059
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h2 className="font-medium">Payment methods</h2>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`w-full border rounded-lg p-4 flex items-center justify-between ${
                    selectedPaymentMethod === method.id ? 'border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {typeof method.icon === 'string' ? (
                      <div className="w-8 h-8 bg-gray-100 rounded-md" />
                    ) : (
                      <method.icon className="w-5 h-5 text-gray-600" />
                    )}
                    <div className="text-left">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </div>
                  <span className="font-medium">₹{product.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Proceed Button */}
          <button className="w-full bg-[#1B2A3B] text-white rounded-lg py-4 font-medium mt-6">
            Proceed to pay
          </button>

          {/* Security Badge */}
          <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
            🔒 Secured by shopify
          </div>
        </div>
      </div>
    </div>
  );
}