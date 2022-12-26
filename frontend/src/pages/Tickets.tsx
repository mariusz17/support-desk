import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getTickets } from "../features/tickets/ticketService";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const Tickets = () => {
  const { tickets } = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!tickets) {
      dispatch(getTickets());
    }
  }, [dispatch, tickets]);

  if (!tickets) return <Spinner />;

  console.log(tickets);

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
    </>
  );
};

export default Tickets;
