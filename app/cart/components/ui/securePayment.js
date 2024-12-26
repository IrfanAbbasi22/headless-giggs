import Image from "next/image";

const SecurePayment = () => {
  return (
    <>
      <div className="w-full  border-t border-t-[#E6E6E6] lg:left-0 lg:bottom-0 py-4  bg-white  z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
            <Image
              className="w-full max-w-80 lg:max-w-96 "
              src={"/secure-payment.svg"}
              width={411}
              height={38}
              alt="secure payment"
            />

            <div className="flex items-center gap-2">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.72318 10.3954C7.40608 10.2833 7.13882 10.0627 6.96864 9.77259C6.79846 9.48248 6.73631 9.14154 6.79319 8.81005C6.85006 8.47855 7.0223 8.17783 7.27945 7.96105C7.5366 7.74426 7.86211 7.62537 8.19845 7.62537C8.53478 7.62537 8.86029 7.74426 9.11744 7.96105C9.37459 8.17783 9.54684 8.47855 9.60372 8.81005C9.66059 9.14154 9.59844 9.48248 9.42826 9.77259C9.25808 10.0627 8.99081 10.2833 8.67371 10.3954V12.8763C8.67371 13.0023 8.62365 13.1232 8.53452 13.2124C8.44539 13.3015 8.32449 13.3515 8.19845 13.3515C8.0724 13.3515 7.95152 13.3015 7.86239 13.2124C7.77326 13.1232 7.72318 13.0023 7.72318 12.8763V10.3954ZM4.12544 6.11802C3.91119 6.11801 3.69904 6.16037 3.50122 6.24265C3.30339 6.32493 3.12378 6.4455 2.97273 6.59744C2.82167 6.74939 2.70214 6.9297 2.62102 7.128C2.5399 7.3263 2.49877 7.53868 2.50003 7.75293V13.171C2.4994 13.3854 2.5411 13.5979 2.62275 13.7963C2.70439 13.9946 2.82436 14.1748 2.9758 14.3267C3.12724 14.4786 3.30716 14.5991 3.50525 14.6813C3.70334 14.7635 3.91571 14.8059 4.13018 14.8059H12.2715C12.4863 14.8065 12.6992 14.7646 12.8979 14.6827C13.0965 14.6007 13.277 14.4803 13.4289 14.3284C13.5809 14.1765 13.7013 13.996 13.7832 13.7974C13.8652 13.5987 13.907 13.3858 13.9064 13.171V7.75293C13.9064 7.32015 13.7348 6.90503 13.4292 6.59856C13.1236 6.29209 12.709 6.11928 12.2762 6.11802V4.21696C12.2949 3.67006 12.2033 3.125 12.0069 2.61425C11.8105 2.10349 11.5133 1.63748 11.133 1.24399C10.7528 0.850498 10.2972 0.537577 9.79341 0.323858C9.28966 0.11014 8.74804 0 8.20082 0C7.65361 0 7.11199 0.11014 6.60823 0.323858C6.10448 0.537577 5.64889 0.850498 5.26861 1.24399C4.88833 1.63748 4.59113 2.10349 4.39473 2.61425C4.19834 3.125 4.10676 3.67006 4.12544 4.21696V6.11802ZM5.75559 6.11802V4.21696C5.74103 3.88678 5.79349 3.55708 5.90981 3.24772C6.02613 2.93836 6.20389 2.65576 6.43239 2.41696C6.66088 2.17817 6.93538 1.98814 7.23932 1.8583C7.54325 1.72847 7.87032 1.66153 8.20082 1.66153C8.53133 1.66153 8.85841 1.72847 9.16235 1.8583C9.46628 1.98814 9.74076 2.17817 9.96926 2.41696C10.1978 2.65576 10.3755 2.93836 10.4918 3.24772C10.6082 3.55708 10.6606 3.88678 10.6461 4.21696V6.11802H5.75559Z"
                  fill="#4D4D4D"
                ></path>
              </svg>
              <span className="text-xs md:text-sm font-semibold text-black text-opacity-75 ">
                100% secured payments
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurePayment;
