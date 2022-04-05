//synchronous action

import { AuthAction } from "../types/types";

export const doAuthSignIn = ( uid: string, userName: string ):AuthAction => ({
  type: "[AUTH] sign in",
  payload: {
    uid,
    userName,
  }
})