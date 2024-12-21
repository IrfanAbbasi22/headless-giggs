const deliverySlots = () => {
  return (
    <>
        <div className="pickupOrder fixed z-50 left-0 right-0 top-0 bottom-0 w-full bg-opacity-50 bg-black flex flex-col gap-6 items-center justify-end lg:justify-center">
            <button className="close p-4 rounded-full bg-white lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path d="M15.5 1L1.5 15M1.5 1L15.5 15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </button>

            <div className={`p-5 rounded-tl-[2rem] rounded-tr-[2rem] lg:rounded-xl w-full min-h-96 lg:min-h-[initial] lg:max-w-[600px] bg-white`}>
            <h3 className="text-xl pb-5 pr-8 mb-4 font-medium border-b border-b-[#DADADA80] relative">
                Modify Delivery Slot

                <button className="hidden lg:block close absolute right-0 top-[6px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M15.5 1L1.5 15M1.5 1L15.5 15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </button>
            </h3>

            <div className="flex flex-col gap-6 max-h-[18rem] lg:max-h-56 overflow-y-scroll scrollbar-hide">
                <div className="wrapper">
                <p className="mb-3">
                    Today
                </p>

                <div className="grid grid-cols-2 xxs:grid-cols-3 sm:grid-cols-4 gap-3">
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                </div>
                </div>
                
                <div className="wrapper">
                <p className="mb-3">
                    Tomorrow
                </p>

                <div className="grid grid-cols-2 xxs:grid-cols-3 sm:grid-cols-4 gap-3">
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                    <button className="text-sm py-3 px-2 rounded-lg bg-[#F8F8F7] border border-[#DADADA80]">
                    7PM - 9PM
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default deliverySlots