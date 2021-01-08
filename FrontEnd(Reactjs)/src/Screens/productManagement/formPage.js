import React from 'react'
import {Card ,CardContent} from "@material-ui/core";
import {CheckboxWithLabel,TextField} from "formik-material-ui";
import { mixed, object,number } from 'yup';
import { Formik,Form,Field,FormikConfig,FormikValues } from 'formik';



export default function formPage() {
    return (
        <div>
            <Card>
                <CardContent>
                    <Formik
                    validationSchema={object({
                        money:mixed().when("millionaire",{
                            is:true,
                            then:number().required().min(100000),
                            otherwise:number().required()
                        })
                    })}
                        initialValues={{
                            firstname:"",
                            lastname:"",
                            money:0,
                            millionaire:false,
                            description:"",
                            
                        }}
                        onSubmit={(values)=>{}}
                        >
                        <Form autoComplete="off">
                            <div>

                            <Field name="firstname" component={TextField} label="First Name"/>
                            <Field name="lastname" component={TextField} label="Last Name"/>
                            <Field name="millionaire" type="checkbox" component={CheckboxWithLabel} l
                            Label={{label:"I am a millionaire "}}/>
                            </div>

                            <div>
                            <Field name="money" type="number" component={TextField} label="All the money i have"/>
                            </div>

                            <div>
                                <Field name="description" component={TextField} label="Description"/>
                            </div>
                            
                        </Form>
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

