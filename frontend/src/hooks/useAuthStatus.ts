import { useState, useLayoutEffect } from "react";
import { useAppSelector } from "../app/hooks";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.auth);

  // I am not sure whether to use useEffect here
  // or useLayoutEffect. For now useLayoutEffect seems better to me,
  // because it does not cause screen flashing like useEffect,
  // when accessing private routes

  useLayoutEffect(() => {
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
