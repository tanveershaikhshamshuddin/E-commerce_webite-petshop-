import React from 'react'
import * as Yup from "yup";
import {Formik,Form} from "formik";
import FormikControl from './FormikControl';

function FormikContainer() {
    const checkboxOptions=[
        {key:"Cricket",value:"Cricket"},
        {key:"Football",value:"Football"},
        {key:"Martial Arts",value:"Martial Arts"},
        {key:"Boxing",value:"Boxing"}
    ]
    const radiobtnOptions=[
        {key:"Pets",value:"Pets"},
        {key:"Foods",value:"Foods"},
        {key:"Medicines",value:"Medicines"},
        {key:"Accessories",value:"Accessories"}
    ]
    const selectOptions=[
        {key:"Select a pet type ",value:""},
        {key:"bird",value:"bird"},
        {key:"cat",value:"cat"},
        {key:"fish",value:"fish"},
        {key:"dog",value:"dog"},
        {key:"small_animals",value:"small_animals"}
    ];

    const initialValues={
        email:'',
        description:"",
        selectpettype:"",
        radioOption:"",
        checkboxOption:[],
        birthDate:null
    }
    const validationSchema=Yup.object({
        email:Yup.string().required("Required").email("Invalid email type "),
        description:Yup.string().required("Required"),
        selectpettype:Yup.string().required("Required"),
        radioOption:Yup.string().required("Required"),
        checkboxOption:Yup.array().required("Required"),
        birthDate:Yup.date().required("Required").nullable()
    });
    const onSubmit=(values,onSubmitProps)=>{
        console.log("Form values :",values);
        onSubmitProps.isSubmitting(false);
    }
    return (
        <div>
            
            <Formik
             initialValues={initialValues}
             validationSchema={validationSchema}
             onSubmit={onSubmit}
            >
                <Form>
                    <FormikControl 
                        control="input"
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                    />
                    <FormikControl 
                        control="textarea"
                        label="Description"
                        name="description"
                        placeholder="Enter Some description"
                    />
                    
                    <FormikControl 
                        control="select"
                        label="Select the pet type"
                        name="selectpettype"
                        options={selectOptions}
                    />
                    <FormikControl
                    control="radio"
                    name="radioOption"
                    label="Choose the product category"
                    options={radiobtnOptions}
                    />
                    
                    <FormikControl
                    control="checkbox"
                    name="checkboxOption"
                    label="Please select all the sports you know"
                    options={checkboxOptions}
                    />

                    <FormikControl
                    control="date"
                    label="Pickout your birthdate"
                    name="birthDate"

                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default FormikContainer
