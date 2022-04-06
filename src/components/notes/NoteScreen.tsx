import { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Note } from '../../interfaces/interfaces';
import { useForm } from "../../hooks/useForm";
import { State } from "../../state/reducers";
import { NotesAppBar } from "./NotesAppBar";
import { doNotesUpdateActiveNote, startNotesDeleteNote } from '../../state/actions/notesActions';


const initialNote: Note = {
  id: '',
  title: '',
  description: '',
  imgUrl: '', 
  date: new Date().getTime(),
}


export const NoteScreen = () => {

  // hooks
  const dispatch = useDispatch();
  const { activeNote } = useSelector( ( state: State ) => state.notes );

  const { formValues, handleChange, resetForm } = useForm<Note>( activeNote || initialNote );
  const { title, description, date, imgUrl } = formValues;

  const dateRef = useRef( date );
  const imgUrlRef = useRef( imgUrl );

  useEffect(() => {
    dispatch( doNotesUpdateActiveNote(formValues));
  }, [ formValues, dispatch ]);

  useEffect(() => {
    if( dateRef.current !== activeNote?.date ) {
      resetForm( activeNote || initialNote );
      dateRef.current = activeNote?.date || new Date().getTime();
    }
    if( imgUrlRef.current !== activeNote?.imgUrl) {
      resetForm( activeNote || initialNote );
      imgUrlRef.current = activeNote?.imgUrl || '';
    }
  }, [activeNote, resetForm])

  // funtions
  const handleDelete = () => {
    dispatch( startNotesDeleteNote( activeNote?.id || '') );
  }


  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={ title }
          onChange={ handleChange }
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="description"
          value={ description }
          onChange={ handleChange }
        ></textarea>

        {
          activeNote?.imgUrl &&
          <div className="notes__image">
            <img
              src={ activeNote?.imgUrl }
              alt="imagen"
            />
          </div>
        }
      </div>

      {
        activeNote?.id &&
        <button
            className="btn btn-danger"
            onClick={ handleDelete }
          >
            Delete
        </button>
      }

    </div>
  );
};
