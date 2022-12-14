import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { addTicket, reset } from "../features/tickets/ticketSlice";
import { Product } from "../features/types";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import type { UserLocalStorage } from "../features/types";

const NewTicket = () => {
  const auth = useAppSelector((state) => state.auth);
  const user = auth.user as UserLocalStorage;
  const ticket = useAppSelector((state) => state.ticket);
  const { message, isLoading, ticket: currentTicket } = ticket;
  const dispatch = useAppDispatch();
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState<Product>(Product.iPhone);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentTicket) {
      dispatch(reset());
      navigate("/");
    }

    if (message) {
      toast.error(message);
    }
  }, [message, ticket, dispatch, navigate, currentTicket]);

  const onSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectedProduct = e.currentTarget.value as Product;

    setProduct(selectedProduct);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTicket = { product, description };

    dispatch(addTicket(newTicket));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" value={name} className="form-control" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Name</label>
          <input type="email" value={email} className="form-control" disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={onSelect}
            >
              {Object.values(Product).map((value, id) => (
                <option value={value} key={id}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
