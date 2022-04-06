import React from "react";
import { useDispatch } from "react-redux";
import { Note } from "../../../interfaces/interfaces";
import { startAuthSignOut } from "../../state/actions/authActions";
import { doNotesActivateNote } from "../../state/actions/notesActions";
import { JournalEntries } from "./JournalEntries";




export const Sidebar = () => {

  const newNote: Note = {
    id: '',
    title: '',
    description: '',
    date: new Date().getTime(),
    imgUrl: '',
  }
  
  //hooks
  const dispatch = useDispatch();

  // functions
  const handleSingOut = () => {
    dispatch( startAuthSignOut() );
  }

  const handleNewEntry = () => {
    dispatch( doNotesActivateNote( newNote ));
  }
  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> Fernando</span>
        </h3>

        <button 
          className="btn"
          onClick={ handleSingOut }
        >Logout</button>
      </div>

      <div 
        className="journal__new-entry"
        onClick={ handleNewEntry }
      >
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
