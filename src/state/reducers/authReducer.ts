import { AuthAction } from "../types/types";

interface StateFull {
  uid: string;
  name: string;
}
interface StateEmpty {}
type AuthState = | StateFull | StateEmpty

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