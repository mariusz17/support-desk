import { Navigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import Spinner from "./Spinner";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
