import { FC } from "react";

import { DateTime } from 'luxon';

import { Note } from "../../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../state/reducers";
import { doNotesActivateNote } from '../../state/actions/notesActions';


interface Props {
  note: Note;
}

export const JournalEntry: FC<Props> = ({ note }) => {
  const { id, title, description, date, imgUrl } = note;
  const dt = DateTime.fromMillis( date );

  // hooks
  const { } = useSelector( (state: State) => state.notes );
  const dispatch = useDispatch();

  // funtions 
  const handleClickEntry = () => {
    dispatch( doNotesActivateNote( note ));
  }
  return (
    <div 
      className="journal__entry pointer"
      onClick={handleClickEntry}
    >
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            `url(${imgUrl})`,
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">{ title }</p>
        <p className="journal__entry-content">
          { description }
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>{ dt.setLocale('es').toFormat('cccc') }</span>
        <h4>{ dt.setLocale('es').toFormat("dd'/'LL'/'yy") }</h4>
        <span>{ dt.setLocale('es').toFormat('t') }</span>
      </div>
    </div>
  );
};
