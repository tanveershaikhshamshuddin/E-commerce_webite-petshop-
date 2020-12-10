import  Select from './fomComponents/Select';
import React from 'react'
import Input from './fomComponents/Input';
import Textarea from './fomComponents/Textarea';
import RadioButton from './fomComponents/RadioButton';
import CheckboxGroup from './fomComponents/CheckboxGroup';


function FormikControl(props) {
    const {control,...rest}=props;
    switch(control){
        case 'input':return <Input {...rest}/>
        case 'textarea':return <Textarea {...rest}/>
        case 'select':return <Select {...rest}/>
        case 'radio':return <RadioButton {...rest} />
        case 'checkbox': return <CheckboxGroup {...rest}/>
        default : return null
    }
}

export default FormikControl
