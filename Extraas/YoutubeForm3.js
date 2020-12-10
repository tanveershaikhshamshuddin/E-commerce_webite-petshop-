import React from 'react'
import { Formik,Form,Field,ErrorMessage,FieldArray} from "formik";
import * as Yup from "yup";
import TextError from './TextError';

function YoutubeForm3() {
    const initialValue={
        name:"",
        email:"",
        channel:"",
        comments:"",
        address:"",
        social:{
            facebook:"",
            twitter:""
        },
        phoneNumbers:[
            "",""
        ],
        phNumbers:['']
    }
   const  validationSchema=Yup.object({
        name:Yup.string("Invalid name").required("Required !!"),
        email:Yup.string().email("Invalid email address").required("Required !"),
        channel:Yup.string().required("Required !!"),
        comments:Yup.string().required("Required !!!")
    });

    const onSubmit=(values,onSubmitProps)=>{
        console.log("Form Data ",values);
        const {name,email,channel,comments,address,social,phoneNumbers}=values;
        console.log(name);
        onSubmitProps.isSubmitting(false);
    }
    
    return (
        <div>
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    (formik)=>{
                        
                        console.log("Formik Component",formik);
                        return (
                            <Form>
                            <div>
                                <label htmlFor="name">Name</label><br/>
                                <Field 
                                type="text"
                                id="name"
                                name="name"
                                /><br/>
                                <ErrorMessage name="name" component={TextError}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label><br/>
                                <Field 
                                type="email"
                                id="email"
                                name="email"
                                /><br/>
                                <ErrorMessage name="email">
                                    {
                                        (errMsg)=>
                                            <div className="error">
                                                {errMsg}
                                            </div>
                                        
                                    }
                                </ErrorMessage>
                            </div>
                            {
                                formik.values.name==="Tanveer" ?
                                <div>
                                <label htmlFor="channel">Channel</label><br/>
                                <Field 
                                type="text"
                                id="channel"
                                name="channel"
                                /><br/>
                                <ErrorMessage  name="channel" component={TextError}/>
                            </div>
                                    :null
                            }
                            <div>
                                <label htmlFor="comments">Comments</label><br/>
                                <Field 
                                component="textarea"
                                type="text"
                                id="comments"
                                name="comments"
                                /><br/>
                                <ErrorMessage  name="comments" component={TextError}/>
                            </div>
                            <div>
                                <label htmlFor="address">Address</label><br/>
                                <Field name="address">
                                    {
                                        props=>{
                                            const {field,form,meta}=props
                                            console.log("Render props ",props)
                                            return(
                                                <div>
                                                    <input type="text" id="address" {...field} />
                                            {meta.touched && meta.error ? <div>{meta.error}</div>:null}
                                                </div>
                                            )
                                        }
                                    }
                                </Field>
                            </div>
                            
                            <div>
                                <label htmlFor="facebook">Facebook Profile</label><br/>
                                <Field type="text" id="facebook" name="social.facebook"/>
                            </div>
                            <div>
                                <label htmlFor="twitter">Twitter Profile</label><br/>
                                <Field type="text" id="twitter" name="social.twitter"/>
                            </div>
        
                            <div>
                                <label htmlFor="primaryPh">Primary phone Number</label><br/>
                                <Field type="text" id="primaryPh" name="phoneNumbers[0]"/>
                            </div>
                            <div>
                                <label htmlFor="secondaryPh">Secondary phone Number</label><br/>
                                <Field type="text" id="secondaryPh" name="phoneNumbers[1]"/>
                            </div>
                            <br/>
                            <button type="submit" disabled={formik.isSubmitting}>Submit</button>
                            <button type="reset">Reset</button>
                        </Form>
         
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default YoutubeForm3
