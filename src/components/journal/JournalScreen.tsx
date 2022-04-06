import { useSelector } from "react-redux";

import { Sidebar } from "./Sidebar";
import { NoteScreen } from "../notes/NoteScreen";
import { NothingSelected } from './NothingSelected';
import { State } from "../../state/reducers";

export const JournalScreen = () => {

  // hooks
  const { activeNote } = useSelector( (state: State) => state.notes );

  // functions


  return (
    <div className="journal__main-content">
      <Sidebar />

      <main>
        {
          activeNote
          ? <NoteScreen />
          : <NothingSelected />
        }
      </main>
    </div>
  );
};
