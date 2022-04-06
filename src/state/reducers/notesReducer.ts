import { Note } from '../../../interfaces/interfaces';
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
    default:
      return state;
  }

}