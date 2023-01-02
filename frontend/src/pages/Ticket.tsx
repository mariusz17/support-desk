import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTicket, closeTicket } from "../features/tickets/ticketService";
import { getNotes } from "../features/notes/notesService";
import { reset as resetNotes } from "../features/notes/notesSlice";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";

const Ticket = () => {
  // Redux Store
  const { notes } = useAppSelector((state) => state.notes);
  const { user } = useAppSelector((state) => state.auth);
  const ticket = useAppSelector((state) => state.ticket.ticket);
  const dispatch = useAppDispatch();

  // Tools
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // Side Effects
  // Get ticket
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

  // Get notes for ticket
  useEffect(() => {
    if (ticketId) {
      dispatch(getNotes(ticketId));

      // return () => {
      //   dispatch(resetNotes());
      // };
    }
  }, [dispatch, ticketId]);

  // Handlers
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId as string))
      .unwrap()
      .then(() => {
        toast.success("Ticket closed");
      })
      .catch(toast.error);
  };

  // Returns
  if (!ticket || !notes) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Submitted: {new Date(ticket.createdAt).toLocaleString("pl-PL")}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue:</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {user &&
        notes.map((note) => (
          <NoteItem note={note} key={note._id} userName={user.name} />
        ))}

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
