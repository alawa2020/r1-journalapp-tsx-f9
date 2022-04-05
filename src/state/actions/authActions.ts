import { Dispatch } from "redux";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { AuthError } from 'firebase/auth'
import Swal from "sweetalert2";

import { AuthAction } from "../types/types";
import { auth } from '../../firebase/config';


//synchronous actions
const doAuthSignIn = ( uid: string, userName: string ):AuthAction => ({
  type: "[AUTH] sign in",
  payload: {
    uid,
    userName,
  }
})


// asynchronous actions
export const startAuthSingUp = ( email: string, password: string, name: string ) => {
  return async( dispatch: Dispatch ) => {
    try {
      const { user} = await createUserWithEmailAndPassword( auth, email, password );
      await updateProfile( user, { displayName: name });
      dispatch(doAuthSignIn( user.uid, user.displayName as string ));
      Swal.fire('Success', 'User registered successfully', 'success')
    } catch ( err ) {
      console.log({ err });
      let authError = err as AuthError;
      Swal.fire('Error', authError.message, 'error')
    }
  }
}
