"use client";
import { useEffect, useRef, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  showUserAddAddressForm,
  // setUserAddresses,
  // userAddresses,
  userDataToken,
} from "../../../store/slices/userSlice";
import DotPulsePreloader from "@/app/cart/components/ui/dotPulsePreloader";
import { getUserAddress } from "@/app/components/lib/user/getUserAddress";
import AddressCard from "./addressCard";
// import SaveNewAddress from "./saveNewAddress";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import SaveNewAddressCard from "./saveNewAddressCard";
import { addressCardData, setaddressCardData } from "@/app/cart/store/slices/nonPersistSlice";

const GetAddress = () => {
  const pathname = usePathname();
  const router = useRouter();

  // const { slug } = router.query
  // console.log(pathname.startsWith("/cart"), "pathname.startsWith")

  const dispatch = useDispatch();
  // const userAddedAddresses = useSelector(userAddresses);
  const userToken = useSelector(userDataToken);
  // const [address, setAddress] = useState(userAddedAddresses  || []);
  // const [address, setAddress] = useState([]);
  

  const address = useSelector(addressCardData);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    // Math.ceil((userAddedAddresses?.length || 0) / 8) || 1
    Math.ceil((address?.length || 0) / 8) || 1
  );
  const [loadMorePreloader, setLoadMorePreloader] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const hasInitiated = useRef(false);
  const [nextPageURL, setNextPageURL] = useState(null);

  const fetchAddress = async (perPage, curPage) => {
    setLoading(curPage === 1);
    setLoadMorePreloader(curPage > 1);

    try {
      const response = await getUserAddress(userToken, perPage, curPage);

      if (response?.addresses) {
        // setAddress((prevAddresses) => [
        //   ...prevAddresses,
        //   ...response.addresses,
        // ]);

        dispatch(setaddressCardData({ type: "loadMore", payload: response.addresses }));
        
        setNextPageURL(response?.next_page_url);
        console.log("response", response);
        if (!response?.next_page_url && response?.next_page_url === null) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        //   dispatch(setUserAddresses([...userAddedAddresses, ...response.addresses]))
        //   dispatch(setUserAddresses(response.addresses));

        // if(response.addresses.length < perPage){
        //     setHasMore(false);
        // }else{
        //     setHasMore(true);
        // }

        console.log('is condition true?', response?.addresses?.length, response?.current_page == 1)
        if(response?.current_page == 1 && response?.addresses?.length == 0){
          dispatch(showUserAddAddressForm({ isVisible: true, address: {} }))
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setShowAddAddress(true);
      setLoading(false);
      setLoadMorePreloader(false);
    }
  };

  const handleLoadMore = () => {
    setLoadMorePreloader(true);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    fetchAddress(8, nextPage);
  };

  // useEffect(() => {
  //     if (!userToken) {
  //         return;
  //     }

  //     // if (!fetchCalled && (!userAddedAddresses || userAddedAddresses.length === 0)) {
  //     //     setFetchCalled(true);
  //     //     fetchAddress(8, 1);
  //     // } else if (userAddedAddresses && userAddedAddresses.length > 0) {
  //     //     setAddress(userAddedAddresses);
  //     //     setShowAddAddress(true);
  //     // }
  //     if (!fetchCalled && (!address || address.length === 0)) {
  //         setFetchCalled(true);
  //         fetchAddress(1, 1);
  //     }
  // }, [fetchCalled]);

  useEffect(() => {
    if (!hasInitiated.current) {
      hasInitiated.current = true;

      if (userToken && !(address?.length > 0)) {
        fetchAddress(8, 1);
      }else{
        setShowAddAddress(true);
      }
    }
  }, [userToken]);

  if (!showAddAddress) {
    return (
      <>
        <div className="@container">
          <div className="grid  @[500px]:grid-cols-2 gap-4 @[500px]:gap-6">
            <Skeleton className="!min-h-44" />
            <Skeleton className="!min-h-44" />
            <Skeleton className="!min-h-44" />
            <Skeleton className="!min-h-44" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {
        pathname.startsWith("/my-account/addresses") &&
        <h3 className="font-medium text-xl flex gap-3 items-center ">
          {" "}
          <Image
            src={`/assets/icons/back-arrow.svg`}
            width={24}
            height={25}
            alt="BackArrow"
            className=" lg:hidden cursor-pointer"
            onClick={() => router.push("/my-account")}
          />
          My Address
        </h3>
      }

      <div className="@container">
        <div className="grid @[500px]:grid-cols-2 gap-4 @[500px]:gap-6 mt-3">
          {address.length > 0 &&
            address.map((item, index) => (
              <AddressCard
                key={`addressList${index}`}
                item={item}
                // setAddress={setAddress}
                address={address}
                addressLength={address?.length}
              />
            ))}

          {showAddAddress && (
            // <SaveNewAddress
            //   addressLength={address?.length}
            //   setAddress={setAddress}
            //   address={address}
            // />

            // Card
            <SaveNewAddressCard />
          )}
        </div>
      </div>
      {/* Load More CTA */}
      {address.length > 0 && hasMore && (
        <div className="place-items-center grid my-5">
          <button
            type="button"
            onClick={handleLoadMore}
            className="w-max py-3 px-8 bg-primary hover:bg-primary-hover rounded-[100px] text-white font-medium disabled:text-primary transition-all relative"
            disabled={loadMorePreloader}
          >
            Load more
            {loadMorePreloader ? (
              <div className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <DotPulsePreloader color={"#fff"} />
              </div>
            ) : (
              ""
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default GetAddress;
