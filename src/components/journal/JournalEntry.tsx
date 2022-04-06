import { FC } from "react";

import { DateTime } from 'luxon';

import { Note } from "../../interfaces/interfaces";


interface Props {
  note: Note;
}

export const JournalEntry: FC<Props> = ({ note }) => {
  const { id, title, description, date, imgUrl } = note;
  const dt = DateTime.fromMillis( date );
  return (
    <div className="journal__entry pointer">
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
