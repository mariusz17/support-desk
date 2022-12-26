import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getTickets } from "../features/tickets/ticketService";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const Tickets = () => {
  // Redux Store
  const { tickets } = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();

  // useEffect
  useEffect(() => {
    if (!tickets) {
      dispatch(getTickets());
    }
  }, [dispatch, tickets]);

  // Returns
  if (!tickets) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
    </>
  );
};

export default Tickets;
