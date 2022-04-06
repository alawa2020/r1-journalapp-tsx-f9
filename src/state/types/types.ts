import { Note } from "../../interfaces/interfaces";

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
  | {
      type: '[NOTES] load notes';
      payload: Note[];
    }
  | {
      type: '[NOTES] update note';
      payload: Note;
    }
  | {
      type: '[NOTES] delete note';
      payload: {
        id: string;
      }
    }
  | {
      type: '[NOTES] clean active note';
    }
  | {
      type: '[NOTES] clean notes state'
    }