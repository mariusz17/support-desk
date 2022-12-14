import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useAppDispatch();
  const { user, isLoading, message } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      toast.error(message);
      dispatch(reset());
    }

    if (user) {
      navigate("/");
    }
  }, [message, dispatch, user, navigate]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    const propName = e.currentTarget.name;

    setFormData((prev) => {
      return {
        ...prev,
        [propName]: newValue,
      };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
