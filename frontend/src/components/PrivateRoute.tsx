import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { savePath } from "../features/savePath/savePathSlice";
import Spinner from "./Spinner";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      dispatch(savePath(location.pathname));
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
