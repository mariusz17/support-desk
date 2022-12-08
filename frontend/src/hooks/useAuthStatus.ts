import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
