import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getTickets } from "../features/tickets/ticketSlice";

const Tickets = () => {
  const ticket = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  console.log(ticket.tickets);

  return <h1>Tickets</h1>;
};

export default Tickets;
