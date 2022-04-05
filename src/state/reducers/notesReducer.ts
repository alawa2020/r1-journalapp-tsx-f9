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
  
    default:
      return state;
  }

}