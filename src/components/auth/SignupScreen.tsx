import { FormEvent, useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "../../hooks/useForm";
import { isValidFormSignup } from '../../helpers/isValidFormSignup';
import { ErrorForm } from "./ErrorForm";
import { startAuthSingUp } from "../../state/actions/authActions";


//interfaces
interface FormData {
  name: string;
  email: string;
  password: string;
  password2: string;
}
interface ErrorData {
  state: boolean;
  msg: string;
}

// start data
const initialForm: FormData = {
  name: '',
  email: '',
  password: '',
  password2: '',
}

const initialError: ErrorData = {
  state: false,
  msg: '',
}

//
export const SignupScreen = () => {
  //hooks
  const {formValues, handleChange} = useForm<FormData>(initialForm);
  const { email, name, password, password2 } = formValues;
  const [error, setError] = useState<ErrorData>( initialError );
  const dispatch = useDispatch();

  //functions
  const handleSignupSubmit = (e: FormEvent<HTMLFormElement> ) => {
    setError(initialError);
    e.preventDefault();
    const {errorMsg, isValidForm} = isValidFormSignup( name, email, password, password2 );
    if( !isValidForm ) {
      setError({
        state: true,
        msg: errorMsg,
      });
      return;
    }

    dispatch( startAuthSingUp( email, password, name) );
   
  }

  return (
    <>
      <h3 className="auth__title">Sign up</h3>

      <form onSubmit={handleSignupSubmit}>

        {
          error.state && <ErrorForm errorMsg={error.msg} />
        }
        <input
          type="text"
          placeholder="Name"
          className="auth__input"
          autoComplete="off"
          name="name"
          value={name}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Email"
          className="auth__input"
          autoComplete="off"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="auth__input"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="auth__input"
          name="password2"
          value={password2}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Sign up
        </button>

        <Link to="/auth/signin" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
