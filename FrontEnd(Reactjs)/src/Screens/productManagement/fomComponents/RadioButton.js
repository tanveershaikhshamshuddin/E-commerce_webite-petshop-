import React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextError from '../TextError';

function RadioButton (props){
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label><br/>
      <Field name={name} {...rest} className="form-control">
        {
          ({ field }) => {
            return options.map(option => {
              return (
                <React.Fragment key={option.key}>
                  <input
                    type='radio'
                    className="mr-2 ml-3"
                    id={option.id}
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                  />
                  <label htmlFor={option.id}>{option.key}</label>

                </React.Fragment>
              );
            })
          }
        }
      </Field>
        <ErrorMessage component={TextError} name={name}/>
    </div>
  );
};
export default RadioButton