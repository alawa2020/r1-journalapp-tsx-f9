import validator from 'validator';

interface Result {
  isValidForm: boolean;
  errorMsg: string;
}

export const isValidFormRegister = ( name: string, email: string, password: string, password2: string ): Result => {
  let isValidForm = true;
  let errorMsg = '';

  if( validator.isEmpty( name )) {
    isValidForm = false;
    errorMsg = 'The name cannot be empty';
  } else if ( !validator.isEmail( email )) {
    isValidForm = false;
    errorMsg = 'This isn\'t an email';
  } else if ( !validator.isLength( password, { min: 6 })) {
    isValidForm = false;
    errorMsg = 'The password must be at least 6 characters';
  } else if ( !validator.equals(password, password2 )) {
    isValidForm = false;
    errorMsg = 'Passwords are not the same';
  }

  return {
    isValidForm,
    errorMsg
  }

}