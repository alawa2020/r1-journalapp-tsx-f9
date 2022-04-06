import { ChangeEvent, useState } from 'react';

import { Note } from '../../interfaces/interfaces';


type EventForm = 
| ChangeEvent<HTMLInputElement> 
| ChangeEvent<HTMLTextAreaElement>


export const useForm = <T extends Object >( initialState: T ) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e: EventForm ) => {
    setFormValues({
      ...formValues,
      [ e.target.name ]: e.target.value,
    })
  }

  const resetForm = ( newState: T = initialState ) => {
    setFormValues( newState );
  }

  return {
    formValues,
    handleChange,
    resetForm,
  }

}
