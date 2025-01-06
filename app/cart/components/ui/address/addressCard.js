import { useState, useEffect, useRef } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  showUserAddAddressForm,
  userDataToken,
} from "../../../store/slices/userSlice";

import { deleteUserAddress } from "@/app/components/lib/user/deleteUserAddress";
import DotPulsePreloader from "@/app/components/ui/preloader/dotPulsePreloader";
import { useUpdateShippingAddress } from "@/app/components/lib/cart/updateShippingAddress";
import { markAsDefaultAddress } from "@/app/components/lib/user/saveUserNewAddress";
import { getUserAddress } from "@/app/components/lib/user/getUserAddress";

const AddressCard = ({ item, setAddress, address, addressLength }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePreloader, setDeletePreloader] = useState(false);
  const [pagePreloader, setPagePreloader] = useState(false);

  const userToken = useSelector(userDataToken);
  const cardData = item;

  const dispatch = useDispatch();

  const handleEditAddress = async () => {
    dispatch(showUserAddAddressForm({ isVisible: true, address: cardData }));
  };

  const handleDeleteAddress = async () => {
    setDeletePreloader(true);

    try {
      const deleteResponse = await deleteUserAddress(cardData?.id);
      
      if (deleteResponse?.addresses) {
        try {
          const response = await getUserAddress(userToken, (addressLength > 8 ? addressLength : 8), 1);
          if (response?.addresses) {
            setAddress(response.addresses);
          }
        } catch (error) {
            console.error("Failed to fetch updated addresses:", error);
        }
      }
    } catch (error) {
      console.error("Error while deleting the address:", error);
    } finally {
      setDeletePreloader(false);
      setShowDeleteModal(false);
    }
  };

  const { updateShippingAddress } = useUpdateShippingAddress();

  const isCardActive = (card, activeAddress) => {
    const keysToMatch = [
      "address_1",
      "address_2",
      "city",
      "country",
      "email",
      "first_name",
      "last_name",
      "phone",
      "postcode",
      "state",
    ];

    return keysToMatch.every((key) => {
      const isMatch = card[key] === activeAddress[key];
      if (!isMatch) {
        console.log(
          `Mismatch found: Key "${key}", Card Value "${card[key]}", Active Address Value "${activeAddress[key]}"`
        );
      }
      return isMatch;
    });
  };

  const updateShippingAddressInCart = async (itemData) => {
    setPagePreloader(true);
    try {
      const updatedItemData = { ...itemData, is_default: 1 };

      // First, await the shipData response
      const shipData = await updateShippingAddress(updatedItemData);
      if (shipData?.code) {
        console.error(shipData);
        if (shipData?.data?.params?.billing_address) {
          alert(shipData?.data?.params?.billing_address);
        }
        throw new Error("Failed to update address with WooCommerce!");
      }
      // If shipData is successfully received, proceed to update the default address
      const updateDefaultAddress = await markAsDefaultAddress(updatedItemData?.id);
      
      // Dispatch the addresses only if updateDefaultAddress contains addresses
      if (updateDefaultAddress?.addresses) {
        try {
          const response = await getUserAddress(userToken, (addressLength > 8 ? addressLength : 8), 1);
          if (response?.addresses) {
            setAddress(response.addresses);
          }
        } catch (error) {
            console.error("Failed to fetch updated addresses:", error);
        }
      }

      // Check if card is active
      const isActive = isCardActive(updatedItemData, shipData.billing_address);
      // console.log('isCardActive result:', isActive);
    } catch (error) {
      // Handle errors here, like showing an error message to the user
      console.error("Error during the update process:", error);
    } finally {
      setPagePreloader(false);
    }
  };

  const isAddressUpdated = useRef(false);
  useEffect(() => {
    if (!isAddressUpdated.current) {
      isAddressUpdated.current = true;
      if (cardData?.is_default === 1) {
        updateShippingAddressInCart(cardData);
      }
    }
  }, [cardData]);

  return (
    <>
      {/* TODO: disable card click using props for my account except for the checkout */}
      <div
        className={`min-h-44 flex gap-2 border rounded-md p-4 md:p-5 ${
          cardData?.is_default !== 0 && isCardActive
            ? "border-primary"
            : "border-[#e6e6e6]"
        }`}
      >
        <svg
          onClick={() => {
            updateShippingAddressInCart(cardData);
          }}
          className="mt-1 min-w-5 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <g fill="none" fillRule="evenodd">
            <circle
              cx="9"
              cy="9"
              r="8.25"
              stroke={`${cardData?.is_default !== 0 ? "#ff5d58" : "#B3B3B3"}`}
              strokeWidth="1.5"
            ></circle>
            <circle
              cx="9"
              cy="9"
              r="4"
              fill={`${cardData?.is_default !== 0 ? "#ff5d58" : ""}`}
            ></circle>
          </g>
        </svg>

        <div className="w-full">
          <span
            onClick={() => {
              updateShippingAddressInCart(cardData);
            }}
            className="cursor-pointer font-medium leading-tight text-base text-black mb-2 inline-block"
          >
            {cardData?.first_name} {cardData?.last_name}
          </span>
          <div className="text-sm text-opacity-50 text-black">
            <div className="text-sm">
              {cardData?.email && (
                <p className="mb-2">
                  Email: <b>{cardData?.email}</b>
                </p>
              )}

              {cardData?.phone && (
                <p className="mb-2">
                  Phone:{" "}
                  <b>
                    +{cardData?.country_ext} {cardData?.phone}
                  </b>
                </p>
              )}
              {cardData?.address_1 && (
                <p className="">
                  {cardData?.address_1}&nbsp;
                  {cardData?.address_2 && cardData?.address_2}
                </p>
              )}
              <p className="capitalize">
                {cardData?.city && cardData?.city}
                {cardData?.state && ` ${cardData.state.toUpperCase()} `}
                {cardData?.postcode && ` ${cardData.postcode}`}
                {cardData?.country && ` ${cardData.country.toUpperCase()}.`}
              </p>
            </div>
          </div>

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              className="uppercase text-black font-medium"
              onClick={(event) => {
                event.stopPropagation();
                handleEditAddress();
              }}
            >
              Edit
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                setShowDeleteModal(true);
              }}
              type="button"
              className="uppercase text-red-600 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed z-50 left-0 right-0 top-0 bottom-0 w-full bg-opacity-50 bg-black flex items-end lg:items-center ">
          <div
            className="addressFormModal w-full bg-white px-4 py-6 rounded-tl-2xl rounded-tr-2xl lg:rounded-xl lg:max-w-96 mx-auto 
                        lg:max-h-[calc(100%-60px)] lg:overflow-y-scroll scrollbar-hide"
          >
            <h3 className="text-xl pb-5 pr-8 mb-4 font-medium border-b border-b-[#DADADA80] relative">
              Delete this address?
              <button
                className="close absolute right-0 top-1"
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M15.5 1L1.5 15M1.5 1L15.5 15"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>

            <div className="text-center flex items-center justify-center gap-2 ">
              <button
                type="button"
                onClick={handleDeleteAddress}
                className={`bg-red-600 hover:bg-red-500 py-3 px-8 rounded-lg font-medium text-base relative
                                disabled:opacity-50 transition-bg ${
                                  deletePreloader
                                    ? "text-red-600 hover:text-red-500"
                                    : "text-white"
                                }`}
                disabled={deletePreloader}
              >
                Delete
                {deletePreloader && (
                  <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <DotPulsePreloader color={"#ffffff"} />
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-100 hover:bg-gray-200 py-3 px-8 rounded-lg font-medium text-base text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {pagePreloader && (
        <div className="fixed z-50 left-0 right-0 top-0 bottom-0 w-full bg-opacity-30 bg-black flex items-end lg:items-center">
          <div
            className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center"
            role="status"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressCard;
