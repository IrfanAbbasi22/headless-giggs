"use client";

import { ArrowLeft, MoreVertical, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Address({ onBack, onProceed }) {
  const [consentChecked, setConsentChecked] = useState(true);
  const address = {
    type: "Work",
    name: "Rishabh tyagi",
    address: "B114 Dwarka Mor New Delhi, Delhi, Delhi, India, 110059",
    phone: "+91 83684 14608",
    email: "rishabh@nexgi.in"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white min-h-screen shadow-sm flex flex-col">
        {/* Header */}
        <div className="border-b">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-1">
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
            <span className="font-semibold">₹16,999</span>
          </div>
          <div className="bg-[#1B2A3B] text-white py-3 px-4 text-center">
            Just one more step to go
          </div>
        </div>

        <div className="p-4 flex-1">
          <h2 className="font-medium mb-4">Delivery</h2>
          
          <button className="w-full text-left border rounded-lg p-4 mb-4 flex items-center gap-2 text-[#1B2A3B]">
            <PlusCircle className="w-5 h-5" />
            <span>Add new address</span>
          </button>

          <div className="border-2 border-[#1B2A3B] rounded-lg p-4 relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full border-2 border-[#1B2A3B] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#1B2A3B]"></div>
              </div>
              <span className="font-medium">{address.type}</span>
              <button className="absolute right-4 top-4">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="ml-6">
              <p className="font-medium">{address.name}</p>
              <p className="text-gray-600 mt-1">{address.address}</p>
              <p className="text-gray-600 mt-1">
                {address.phone}, {address.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2">
            <input
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-gray-600">
              I consent to receive communications from The Sleep Company via phone call, WhatsApp, Email or SMS.
            </label>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Logged in with +91 83684 14608
            <button className="ml-2 text-[#1B2A3B]">Log out</button>
          </div>
        </div>

        <div className="p-4 border-t mt-auto">
          <button
            onClick={onProceed}
            className="w-full bg-[#1B2A3B] text-white rounded-lg py-4 font-medium"
          >
            Proceed to pay
          </button>
          <div className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
            🔒 Secured by shopify
          </div>
        </div>
      </div>
    </div>
  );
}