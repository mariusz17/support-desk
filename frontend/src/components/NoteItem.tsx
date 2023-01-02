import { CreatedNote } from "../features/types";

type Props = {
  note: CreatedNote;
  userName: string;
};

const NoteItem: React.FC<Props> = ({ note, userName }) => {
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
      key={note._id}
    >
      <h4>
        Note from: {note.isStaff ? <span>Staff</span> : <span>{userName}</span>}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString("pl-PL")}
      </div>
    </div>
  );
};

export default NoteItem;
