import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../state/reducers";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = () => {
  // hooks 
  const { notes } = useSelector( (state: State) => state.notes );

  return (
    <div className="journal__entries">
      {notes.map(( note ) => (
        <JournalEntry key={ note.id } note={ note }/>
      ))}
    </div>
  );
};
