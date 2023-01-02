export type NewNote = {
  user: string;
  ticket: string;
  text: string;
  isStaff?: boolean;
  staffId?: string;
};
export type CreatedNote = {
  _id: string;
  user: string;
  ticket: string;
  text: string;
  isStaff: boolean;
  createdAt: string;
  staffId?: string;
};
