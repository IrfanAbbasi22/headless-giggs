"use client";
import React, { useState } from 'react';

const PostSideBar = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Reset error state
      setError("");
  
      // Validate email
      if (!email) {
        setError("Email is required");
        return;
      }
  
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
  
      // Store subscription in localStorage
      try {
        const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));
        
        // Show success state
        setIsSubscribed(true);
        setEmail("");
  
        // Show toast message
        const toast = document.getElementById("toast");
        toast.classList.remove("hidden");
        setTimeout(() => {
          toast.classList.add("hidden");
        }, 3000);
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };
    
    return (
        <>
            <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
                    <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Subscribe to Our Newsletter
                    </h3>
                    <p className="text-gray-600">
                        Get the latest updates delivered straight to your inbox.
                    </p>
                    </div>

                    {isSubscribed ? (
                    <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-800 font-medium">
                        Thank you for subscribing! 🎉
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                        You&apos;ll receive our next newsletter soon.
                        </p>
                    </div>
                    ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <div className="flex flex-col gap-[10px]">
                                <label htmlFor="subscribeMail" className="text-xs lg:text-base font-medium text-gray-900">
                                    Email <span className=" text-red-400">*</span>
                                </label>
                                <div className=" relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                    <input id="subscribeMail" placeholder="Enter your email" className=" w-full px-4 pl-10 py-[10px] text-black placeholder-gray-500 placeholder:text-xs lg:placeholder:text-sm   bg-white border focus:border-primary focus:outline-none  rounded-md  " 
                                        type="email" required name="email" 
                                        
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        />
                                </div>
                            </div>
                            {error && (
                                <p className="mt-1 text-sm text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>
                        <button
                        type="submit"
                        className="w-full bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-primary-hover transition duration-200"
                        >
                        Subscribe
                        </button>
                    </form>
                    )}
            </div>
        </>
    )
}

export default PostSideBar