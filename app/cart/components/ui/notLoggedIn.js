"use client"
import { useDispatch } from "react-redux"
import { showUserModal } from "../../store/slices/userSlice";
import Cookies from "js-cookie";

export default function NotLoggedIn() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md w-full px-6 py-8 space-y-8">
        <div className="text-center">
            <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
                <path opacity="0.2" d="M100 0C44.77 0 0 44.77 0 100C0 155.23 44.77 200 100 200C155.23 200 200 155.23 200 100C200 44.77 155.23 0 0 0H100ZM100 30C116.57 30 130 43.43 130 60C130 76.57 116.57 90 100 90C83.43 90 70 76.57 70 60C70 43.43 83.43 30 100 30ZM100 170C75 170 52.83 157.16 40 137.65C40.3 117.7 80 106.74 100 106.74C120 106.74 159.7 117.7 160 137.65C147.17 157.16 125 170 100 170Z" fill="#FF5D58"/>
                <path d="M160 70C137.91 70 120 87.91 120 110C120 132.09 137.91 150 160 150C182.09 150 200 132.09 200 110C200 87.91 182.09 70 160 70ZM180 115H165V130H155V115H140V105H155V90H165V105H180V115Z" fill="#FF5D58"/>
            </svg>

            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Please sign in to access your dashboard
            </p>
        </div>

        <div className="mt-8">
          <button
            className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-md text-white bg-[#FF5D58] hover:bg-[#ff4742] focus:outline-none  transition-colors duration-200"
            onClick={() => {
              if(!Cookies.get('user_token')){
                dispatch(showUserModal(true))
              }
            }}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#ff7471] group-hover:text-[#ffadab]" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg>
            </span>
            Sign in to your account
          </button>
        </div>
      </div>
    </div>
  );
}
