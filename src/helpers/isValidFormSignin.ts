import validator from 'validator';

interface Result {
  isValidForm: boolean;
  errorMsg: string;
}

export const isValidFormSignin = ( email: string, password: string): Result => {
  let isValidForm = true;
  let errorMsg = '';

  if ( !validator.isEmail( email )) {
    isValidForm = false;
    errorMsg = 'This isn\'t an email';
  } else if ( validator.isEmpty( password )) {
    isValidForm = false;
    errorMsg = 'The password cannot be empty';
  } 

  return {
    isValidForm,
    errorMsg
  }

}