import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTicket, closeTicket } from "../features/tickets/ticketService";
import { getNotes, addNote } from "../features/notes/notesService";
import { reset as resetNotes } from "../features/notes/notesSlice";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import Spinner from "../components/Spinner";

const customStyles: Modal.Styles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

const Ticket = () => {
  // Redux Store
  const { notes } = useAppSelector((state) => state.notes);
  const { user } = useAppSelector((state) => state.auth);
  const ticket = useAppSelector((state) => state.ticket.ticket);
  const dispatch = useAppDispatch();

  // State
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

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
  }, [dispatch, navigate, ticket?._id, ticketId]);

  // Get notes for ticket
  useEffect(() => {
    if (ticketId) {
      dispatch(getNotes(ticketId));

      return () => {
        dispatch(resetNotes());
      };
    }
  }, [dispatch, ticketId]);

  // Handlers
  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId as string))
      .unwrap()
      .then(() => {
        toast.success("Ticket closed");
      })
      .catch(toast.error);
  };

  // Open/close Modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Submit new note
  const onNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && ticket) {
      dispatch(addNote({ note: noteText }))
        .unwrap()
        .then(() => {
          toast.success("Note posted");
          setNoteText("");
          closeModal();
        })
        .catch(toast.error);
    }
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

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus />
          Add note
        </button>
      )}

      {user &&
        notes.map((note) => (
          <NoteItem note={note} key={note._id} userName={user.name} />
        ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add note"
      >
        <h2>Add note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
