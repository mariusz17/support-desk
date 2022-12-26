import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getTickets } from "../features/tickets/ticketService";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import BackButton from "../components/BackButton";

const Tickets = () => {
  // Redux Store
  const { tickets } = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();

  // Side Effects
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
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Tickets;
