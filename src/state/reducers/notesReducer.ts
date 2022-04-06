import { Note } from '../../interfaces/interfaces';
import { NotesAction } from '../types/types';

interface NotesState {
  notes: Note[],
  activeNote: Note | null;
}
const initialState: NotesState = {
  notes: [],
  activeNote: null,
} 


export const notesReducer = ( state: NotesState = initialState, action: NotesAction ): NotesState => {
  switch (action.type) {
    case '[NOTES] activate note':
      return {
        ...state,
        activeNote: action.payload,
      }

    case '[NOTES] update active note':
      return {
        ...state,
        activeNote: { ...state.activeNote, ...action.payload}
      }
    
    case '[NOTES] add new note':
      return {
        ...state,
        notes: [ {...action.payload}, ...state.notes ],
      }

    case '[NOTES] load notes':
      return {
        ...state,
        notes: [...action.payload],
      }
    
    case '[NOTES] update note':
      return {
        ...state,
        notes: state.notes.map( note => (
          note.id === action.payload.id ? action.payload : note
        ))
      }

    case '[NOTES] delete note':
      return {
        ...state,
        notes: state.notes.filter( note => note.id !== action.payload.id )
      }

    case '[NOTES] clean active note':
      return {
        ...state,
        activeNote: null,
      }
    default:
      return state;
  }

}