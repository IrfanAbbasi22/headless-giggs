import { useDispatch } from "react-redux";
import { resetUser } from "../../../cart/store/slices/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";

export const useHandleUserLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    if (Cookies.get("user_token")) {
      Cookies.remove("user_token");
      dispatch(resetUser());

      toast.success("Logged out successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      router.push(`/`);
    }
  };

  return { handleLogout };
};
