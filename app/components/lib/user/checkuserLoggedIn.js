import Cookies from "js-cookie";

export const checkuserLoggedIn = async (isRegistered) => {

  if(!Cookies.get("user_token")){
    alert('Logged In')
  }
  return
};