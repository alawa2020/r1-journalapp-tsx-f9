import {collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Dispatch } from 'redux';

import { Note, UploadedNote } from '../../interfaces/interfaces';
import { NotesAction } from '../types/types';
import { db } from '../../firebase/config';
import { State } from '../reducers';
import { FullAuthState } from '../reducers/authReducer';
import Swal from 'sweetalert2';
import { getNotes } from '../../helpers/getNotes';



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

export const doNotesLoadNotes = ( notes: Note[] ): NotesAction => ({
  type: '[NOTES] load notes',
  payload: notes,
})

const doNotesUpdateNote = ( note: Note): NotesAction => ({
  type: '[NOTES] update note',
  payload: note,
});

const doNotesDeleteNote = ( id: string ): NotesAction => ({
  type: '[NOTES] delete note',
  payload: {
    id,
  }
});

const doNotesCleanActiveNote = (): NotesAction => ({
  type: '[NOTES] clean active note',
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

export const startNotesLoadNotes = () => {
  return async( dispatch: Dispatch, getState: () => State ) => {
    const { uid } = getState().auth as FullAuthState;
    const notes = await getNotes( uid );
    dispatch( doNotesLoadNotes( notes as Note[] ));

  }
}

export const startNotesUpdateNote = ( note: Note) => {
  return async( dispatch: Dispatch, getState: () => State ) => {
    try {
      const { uid } = getState().auth as FullAuthState;
      const { id, ...rest } = note;
      const updatedNote: UploadedNote = { ...rest };

      const docRef = doc( db, `/${ uid }/journal/notes/${ note.id }`)
      await updateDoc( docRef, updatedNote as any );
      
      dispatch( doNotesUpdateNote( note ) );
      Swal.fire('success', 'note updated succesfully', 'success');
    } catch (err) {
      console.log(err);
      Swal.fire('error', 'the note could not be uploaded', 'error');
    }
  }
}

export const startNotesDeleteNote = ( id: string ) => {
  return async( dispatch: Dispatch, getState: () => State ) => {
    try {
      const { uid } = getState().auth as FullAuthState;

      const docRef = doc( db, `/${ uid }/journal/notes/${ id }`);
      await deleteDoc( docRef );

      dispatch( doNotesDeleteNote( id ));
      dispatch( doNotesCleanActiveNote() );
      Swal.fire('success', 'note deleted succesfully', 'success');
    } catch (err) {
      console.log(err);
      Swal.fire('error', 'the note could not be deleted', 'error');
    }
  }
}