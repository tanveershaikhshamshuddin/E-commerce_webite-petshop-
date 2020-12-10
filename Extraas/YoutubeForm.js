import React from 'react'
import {useFormik} from "formik";
import * as Yup from "yup";

function YoutubeForm() {
    const initialValues={
        name:"",
        email:"",
        channel:""
    }
    const validate=values=>{
        let errors={}
            //values.name values.email values.channel
            //errors.name errors.email errors.channel
            //errors.name ="This field is required "
            if(!values.name){errors.name="Required"}
            
            if(!values.email){
                errors.email="Required"
            }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
                errors.email="Invalid email format "
            }
            
            if(!values.channel){errors.channel="Required"}

        return errors
    }

    const validationSchema=Yup.object({
        name:Yup.string().required("Required !"),
        email:Yup.string().email("Invalid email address").required("Required !"),
        channel:Yup.string().required("Required !")
    })
    const onSubmit=values=>{
        console.log("Form Data :",values);
    }

    const formik=useFormik({
        initialValues,
        onSubmit,
       // validate,
       validationSchema

    });
    console.log("Visited feilds :",formik.touched); //becuase we haved added onBlur function in put feild formik will keep track of which feild is visited or touched inan object called formik.touched
    //console.log("Form values :",formik.values); 
    console.log("Form errors :",formik.errors);
    return (
        <div>
            
            <h3>Product Manage Form Part 1</h3>
            <form onSubmit={formik.handleSubmit}>
            
            <div>
            <label htmlFor="name">Name</label><br/>
            <input type="text" id="name" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}/><br/>
            {formik.errors.name &&  formik.touched.name?<span style={{color:"red"}}>{formik.errors.name}</span>:null}
            </div>
            <br/>

            <div>
            <label htmlFor="email">Email</label><br/>
            <input type="text" id="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/><br/>
            {formik.errors.email && formik.touched.email?<span style={{color:"red"}}>{formik.errors.email}</span>:null}
            </div>
            <br/>

            <div>
            <label htmlFor="channel">Channel</label><br/>
            <input type="text" id="channel" name="channel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.channel}/>            <br/>
            {formik.errors.channel && formik.touched.channel?<span style={{color:"red"}}>{formik.errors.channel}</span>:null}
            </div>
            <br/><br/>

            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm
