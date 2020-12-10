import React from 'react'
import * as Yup from "yup";
import {useFormik} from "formik";
function YoutubeForm2() {
    const initialValues={
        name:"",
        email:"",
        channel:""
    }

    const validationSchema=Yup.object({
        name:Yup.string().required("Required !"),
        email:Yup.string().email("Invalid email address").required("Required !"),
        channel:Yup.string().required("Required !")
    });
    const onSubmit=values=>{
        console.log("Form Data :",values);
        
    }

    const formik=useFormik({
        initialValues,
        onSubmit,
       validationSchema

    });
    console.log("Visited feilds :",formik.touched); //becuase we haved added onBlur function in put feild formik will keep track of which feild is visited or touched inan object called formik.touched
    //console.log("Form values :",formik.values); 
    console.log("Form errors :",formik.errors);
    return (
        <div>
             <h3>Product Manage Form Part 2</h3>
            <form onSubmit={formik.handleSubmit}>
            
            <div>
            <label htmlFor="name">Name</label><br/>
            <input 
            type="text" 
            id="name" 
            name="name"
            {...formik.getFieldProps("name")}
            /><br/>
            {formik.errors.name &&  formik.touched.name?<span style={{color:"red"}}>{formik.errors.name}</span>:null}
            </div>
            <br/>

            <div>
            <label htmlFor="email">Email</label><br/>
            <input type="text" id="email" name="email" {...formik.getFieldProps("email")}/><br/>
            {formik.errors.email && formik.touched.email?<span style={{color:"red"}}>{formik.errors.email}</span>:null}
            </div>
            <br/>

            <div>
            <label htmlFor="channel">Channel</label><br/>
            <input type="text" id="channel" name="channel" {...formik.getFieldProps("channel")}/> <br/>
            {formik.errors.channel && formik.touched.channel?<span style={{color:"red"}}>{formik.errors.channel}</span>:null}
            </div>
            <br/><br/>

            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm2
