import { AuthAction } from "../types/types";

interface FullState {
  uid: string;
  name: string;
}
interface EmptyState {}
type AuthState = | FullState | EmptyState

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