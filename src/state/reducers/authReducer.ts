import { AuthAction } from "../types/types";

export interface FullAuthState {
  uid: string;
  name: string;
}
interface EmptyAuthState {}
type AuthState = | FullAuthState | EmptyAuthState

const initialState: AuthState = {}

export const authReducer = ( state = initialState , action: AuthAction ): AuthState => {
  switch (action.type) {
    case '[AUTH] sign in':
      return {
        ...state,
        ...action.payload,
      }

    case "[AUTH] sign out":
      return {}
  
    default:
      return state;
  }
}