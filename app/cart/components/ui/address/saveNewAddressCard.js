// redux
import { useDispatch } from "react-redux";
import { showUserAddAddressForm } from "../../../store/slices/userSlice";

const SaveNewAddressCard = () => {
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(showUserAddAddressForm({ isVisible: true, address: {} }));
  };

  return (
    <>
      <button
        onClick={(event) => {
          event.stopPropagation();
          showModal();
        }}
        className={`min-h-44 flex items-center justify-center border border-[#e6e6e6] rounded-md p-4 md:p-5
                group hover:border-primary hover:text-primary font-medium transition-all
                `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="mr-2"
        >
          <g
            fill="primary"
            fillRule="nonzero"
            className="group-hover:fill-primary transition-all"
          >
            <path d="M8 0a1 1 0 01.993.883L9 1v14a1 1 0 01-1.993.117L7 15V1a1 1 0 011-1z"></path>
            <path d="M15 7a1 1 0 01.117 1.993L15 9H1a1 1 0 01-.117-1.993L1 7h14z"></path>
          </g>
        </svg>
        <span>Add new address</span>
      </button>
    </>
  );
};

export default SaveNewAddressCard;
