import { UserLocalStorage } from "../types";

// Function to get token from local storage
const getTokenFromLS = () => {
  // Get user from local storage
  const userLS = localStorage.getItem("user");
  if (!userLS) {
    return "";
  }

  // Get token from user object
  const { token } = JSON.parse(userLS) as UserLocalStorage;
  if (!token) {
    return "";
  }

  return token;
};

export default getTokenFromLS;
