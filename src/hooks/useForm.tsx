import { ChangeEvent, useState } from 'react';

export const useForm = <T extends Object >( initialState: T ) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [ e.target.name ]: e.target.value,
    })
  }

  const resetForm = () => {
    setFormValues( initialState );
  }

  return {
    formValues,
    handleChange,
    resetForm,
  }

}
