import React, { FC } from 'react'

interface Props {
  errorMsg: string;
}
export const ErrorForm:FC<Props> = ({ errorMsg }) => {
  return (
    <div className='auth__alert-error'>
      {errorMsg}
    </div>
  )
}
