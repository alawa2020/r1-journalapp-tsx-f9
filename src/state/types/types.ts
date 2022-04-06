import { Note } from "../../../interfaces/interfaces";

export type AuthAction = 
  | { 
      type: '[AUTH] sign in'; 
      payload: {
        uid: string; 
        userName: string 
      } 
    }
  | { 
      type: '[AUTH] sign out' 
    }

export type NotesAction =
  | { type: '[NOTES] activate note'; 
      payload: Note;
    }
  | {
      type: '[NOTES] update active note';
      payload: Note;
    }
  | {
      type: '[NOTES] add new note';
      payload: Note;
    }