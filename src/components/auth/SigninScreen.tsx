import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { ErrorForm } from "./ErrorForm";
import { isValidFormSignin } from '../../helpers/isValidFormSignin';
import { useDispatch } from "react-redux";
import { startAuthSignIn, startSigninGoogle } from "../../state/actions/authActions";

// interfaces
interface FormData {
  email: string;
  password: string;
}
interface FormError {
  state: boolean;
  msg: string;
}

// start datas
const initialForm: FormData = {
  email: '',
  password: '',
}
const initialError: FormError = {
  state: false,
  msg: '',
}
export const SigninScreen = () => {

  // hooks 
  const { formValues, handleChange } = useForm<FormData>( initialForm);
  const { email, password } = formValues;
  const [error, setError] = useState<FormError>(initialError);
  const dispatch = useDispatch();

  // functions
  const handleSigninSubmit = (e: FormEvent<HTMLFormElement>) => {
    setError( initialError );
    e.preventDefault();
    const {errorMsg, isValidForm } = isValidFormSignin( email, password );
    if( !isValidForm ) {
      setError({
        ...error,
        msg: errorMsg,
        state: true,
      });
      return;
    }
    dispatch( startAuthSignIn( email, password ));
  }

  const handleSigninGoogle = () => {
    dispatch(startSigninGoogle());
  }
  return (
    <>
      <h3 className="auth__title">Sign in</h3>

      <form onSubmit={ handleSigninSubmit }>
        {
          error.state && <ErrorForm errorMsg={ error.msg } />
        }
        <input
          type="text"
          placeholder="Email"
          className="auth__input"
          autoComplete="off"
          name="email"
          value={ email }
          onChange={ handleChange }
          />

        <input
          type="password"
          placeholder="Password"
          className="auth__input"
          name="password"
          value={ password }
          onChange={ handleChange }
        />

        <button type="submit" className="btn btn-primary btn-block">
          Sign in
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div className="google-btn" onClick={ handleSigninGoogle }>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/signup" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
