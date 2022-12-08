import { Navigate } from "react-router";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
