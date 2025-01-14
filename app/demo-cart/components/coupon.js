"use client";

import { ArrowLeft, Tag } from "lucide-react";
import { useState } from "react";

export default function Coupon({ onBack, cartValue }) {
  const [couponCode, setCouponCode] = useState("");

  const unavailableCoupons = [
    {
      code: "CHAIR5",
      title: "Get 5% off",
      description: "on minimum purchase of 3 items",
      additionalInfo: "Add eligible items to cart",
      viewMore: true
    },
    {
      code: "GOLD",
      title: "Flat ₹2000.0 off",
      description: "on orders above ₹75000.0",
      additionalInfo: "Add ₹58001.00 more to avail this offer",
      viewMore: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white min-h-screen shadow-sm">
        {/* Header */}
        <div className="border-b">
          <div className="px-4 py-4 flex items-center gap-4">
            <button onClick={onBack} className="p-1">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-medium">Coupons</h1>
              <p className="text-sm text-gray-500">Cart value · ₹{cartValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Coupon Input */}
        <div className="p-4">
          <div className="flex items-center gap-3 border rounded-lg p-3">
            <Tag className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-1 outline-none"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        {/* Unavailable Coupons */}
        <div className="px-4">
          <h2 className="text-gray-500 text-sm font-medium mb-3">UNAVAILABLE COUPONS</h2>
          <div className="space-y-4">
            {unavailableCoupons.map((coupon) => (
              <div key={coupon.code} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-gray-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-medium">{coupon.title}</h3>
                    <p className="text-sm text-gray-500">{coupon.description}</p>
                    <p className="text-sm text-red-500 mt-1">{coupon.additionalInfo}</p>
                    {coupon.viewMore && (
                      <button className="text-sm text-gray-600 mt-2">View more</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}