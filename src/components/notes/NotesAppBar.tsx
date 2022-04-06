import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useRef} from 'react';

import { uploadImgAndGetUrl } from '../../helpers/uploadImgAndGetUrl';
import { doNotesUpdateActiveNote, startNotesAddNewNote } from '../../state/actions/notesActions';
import { State } from '../../state/reducers';
import { Note } from '../../../interfaces/interfaces';


export const NotesAppBar = () => {
  // hooks
  const dispatch = useDispatch();
  const { activeNote } = useSelector( (state: State) => state.notes );

  const inputFileRef = useRef<HTMLInputElement>(null);

  //functions
  const handleClickPicture = () => {
    inputFileRef.current?.click();
  }
  const handleChangeInputFile = async(e: ChangeEvent<HTMLInputElement>) => {
    let file: File;
    if( e.target.files ) {
      file = e.target.files[0];
      const url = await uploadImgAndGetUrl( file );
      const newNote = {...activeNote, imgUrl: url}
      dispatch( doNotesUpdateActiveNote( newNote as Note ));
    }
    e.target.value = '';
  }

  const handleSaveClick = () => {
    if ( !activeNote?.id ) {
      dispatch( startNotesAddNewNote( activeNote as Note) );
    } else {
      alert('note updated!')
    }
  }

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <div>
        <input 
          type="file" 
          style={{display: 'none'}}
          ref={ inputFileRef }
          onChange={ handleChangeInputFile }
        />
        <button 
          className="btn"
          onClick={ handleClickPicture }
        >Picture</button>

        <button 
          className="btn"
          onClick={ handleSaveClick }
        >Save</button>
      </div>
    </div>
  );
};
