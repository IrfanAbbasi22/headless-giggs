import { useDispatch } from "react-redux";
import { resetUser } from "../../../cart/store/slices/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useHandleUserLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    if (Cookies.get("user_token")) {
      Cookies.remove("user_token");
      dispatch(resetUser());

      router.push(`/`);
    }
  };

  return { handleLogout };
};
