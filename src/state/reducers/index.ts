import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { notesReducer } from "./notesReducer";

export const reducers = combineReducers({
  auth: authReducer,
  notes: notesReducer,
});