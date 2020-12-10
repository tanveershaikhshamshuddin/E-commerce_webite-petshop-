import { ErrorMessage, Field } from 'formik'
import React from 'react'
import TextError from '../TextError'

function Textarea(props) {
    const {label,name,...rest}=props
    return (
        <div>
            
            <Field as="textarea" placeholder={label} name={name} {...rest}/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}


export default Textarea
