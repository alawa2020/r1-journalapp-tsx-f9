import {collection, addDoc } from 'firebase/firestore';
import { Dispatch } from 'redux';

import { Note, UploadedNote } from '../../../interfaces/interfaces';
import { NotesAction } from '../types/types';
import { db } from '../../firebase/config';
import { State } from '../reducers';
import { FullAuthState } from '../reducers/authReducer';
import Swal from 'sweetalert2';



// synchronous actions
export const doNotesActivateNote = ( note: Note ): NotesAction => ({
  type: '[NOTES] activate note',
  payload: note,
});

export const doNotesUpdateActiveNote = ( note: Note): NotesAction => ({
  type: '[NOTES] update active note',
  payload: note,
})

const doNotesAddNewNote = ( note: Note): NotesAction => ({
  type: '[NOTES] add new note',
  payload: note,
})


// asynchronous actions
export const startNotesAddNewNote = ( note: Note ) => {
  return async( dispatch: Dispatch, getState: () => State) => {
    try {
      const { uid } = getState().auth as FullAuthState;
      const {id, ...rest } = note;
      const uploadedNote: UploadedNote = {...rest};
      
      const collectionRef = collection( db, `${uid}/journal/notes`);
      const doc = await addDoc( collectionRef, uploadedNote);
      
      const newNote: Note = { ...note, id: doc.id };
      dispatch( doNotesUpdateActiveNote( newNote ));
      dispatch( doNotesAddNewNote( newNote ));

      Swal.fire('success', 'note uploaded succesfully', 'success');

    } catch (err) {
      console.log({ err });
      Swal.fire('error', 'the note could not be uploaded', 'error');
    }
  }
}
