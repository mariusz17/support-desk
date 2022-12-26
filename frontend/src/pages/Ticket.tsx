import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTicket } from "../features/tickets/ticketService";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const Ticket = () => {
  // Redux Store
  const ticket = useAppSelector((state) => state.ticket.ticket);
  const dispatch = useAppDispatch();

  // Tools
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // Side Effects
  useEffect(() => {
    if (ticketId && ticketId !== ticket?._id) {
      dispatch(getTicket(ticketId))
        .unwrap()
        .catch((_) => {
          toast.error("Ticket not found");
          navigate("/tickets");
        });
    }
  }, [dispatch, ticketId, navigate, ticket?._id]);

  // Returns
  if (!ticket) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <BackButton url="/tickets" />
      <h2>
        Ticket ID: {ticket._id}
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
      </h2>
      <h3>Submitted: {new Date(ticket.createdAt).toLocaleString("pl-PL")}</h3>
      <hr />
      <div className="ticket-desc">
        <h3>Description of issue:</h3>
        <p>{ticket.description}</p>
      </div>
    </div>
  );
};

export default Ticket;
