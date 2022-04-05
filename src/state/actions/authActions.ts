import { Dispatch } from "redux";
import Swal from "sweetalert2";
import { 
  AuthError, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'

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
      const authError = err as AuthError;
      Swal.fire('Error', authError.message, 'error')
    }
  }
}

export const startAuthSignIn = ( email: string, password: string ) => {
  return async( dispatch: Dispatch) => {
    try {
      const { user } = await signInWithEmailAndPassword( auth, email, password );
      dispatch( doAuthSignIn( user.uid, user.displayName || ''));
      Swal.fire('Success', 'Successful login', 'success')
    } catch (err) {
      const authError = err as AuthError;
      Swal.fire('Error', authError.message, 'error')
    }
  }
}
