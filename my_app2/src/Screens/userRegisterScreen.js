import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import TextError from './productManagement/TextError';
import "./userRegisterScreen.css";
import * as Yup from "yup";
import { CircularProgress,IconButton,Collapse } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';

function userRegisterScreen(props) {
    
    const userSignin=useSelector(state=>state.userRegister);
    const {loading,userInfo,error}=userSignin
    const dispatch=useDispatch();
    
    const onSubmitReg=(values,{ resetForm })=>{
        const {name,email,phoneno,password}=values;

        console.log(values);
        dispatch(register(name,email,phoneno.toString(),password));
        resetForm({});
    }
    useEffect(() => {
        if(userInfo){
            console.log(userInfo);
        }
    }, [userInfo]);
   const  initialValue={
        name:"",
        email:"",
        phoneno:"",
        password:"",
        repassword:""
    }
    const lowercaseRegex=/(?=.*[a-z])/;
    const uppercaseRegex=/(?=.*[A-Z])/;
    const numericRegex=/(?=.*[0-9])/;
    const validationSchema=Yup.object().shape({
        name:Yup.string().required("Required"),
        email:Yup.string().email("Invalid email address").required("Required"),
        phoneno:Yup.string().min(10).max(10).required("Required"),
        password:Yup.string()
        .matches(lowercaseRegex,"one lower case character required")
        .matches(uppercaseRegex,"one upper case character required")
        .matches(numericRegex,"one numeric character is required")
        .min(6,"password must be greater than or equal to 6 character ")
        .required("password is Required"),
        repassword:Yup.string().required("confirm password required").when("password",{
            is: val=>(val && val.length>0 ? true :false),
            then:Yup.string().oneOf(
                [Yup.ref("password")],
                "Confirm password doesn't match with the password !"
            )
        })
    });
    const [open, setOpen] = useState(true);
    return (
        <div className="userRegister">
            <div className="main_form">
        <div className="container mt-4 shadow-lg p-5 col-lg-6">
       <h2 className="text text-italic">Register</h2>
        <h4>
            {loading && <div><CircularProgress  color="secondary" /></div>}
            {error && <div><small><Alert severity="error">{error}</Alert></small></div>}
            {userInfo && <div><small><Collapse in={open}>  <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Registration Sucessfull 
        </Alert>
        </Collapse>
</small></div>}
        </h4>
        <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmitReg}
        >
        <Form action=""method="post">
        <div className="form-group">
                <label>Name</label>
                <Field id="name" type="text" className="form-control" placeholder="Enter your name"name="name" autocComplete="off"/>
                <ErrorMessage component={TextError} name="name"/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <Field id="email" type="email" className="form-control" placeholder="Enter your email" name="email" autoComplete="off"/>
                <ErrorMessage component={TextError} name="email"/>
            </div>
            <div className="form-group">
                <label>Phone no</label>
                <Field id="phoneno" type="number" className="form-control" placeholder="Enter your phone no" name="phoneno"autoComplete="off"/>
                <ErrorMessage component={TextError} name="phoneno"/>
            </div>
            <div className="form-group">
                <label>Password </label>
                <Field id="password" type="password" className="form-control" placeholder="Enter your password" name="password"autoComplete="off"/>
                <ErrorMessage component={TextError} name="password"/>
            </div>
            
            <div className="form-group">
                <label>Confirm Password </label>
                <Field id="repassword" type="password" className="form-control" placeholder="Enter your password again"name="repassword" autoComplete="off"/>
                <ErrorMessage component={TextError} name="repassword"/>
            </div>
            <br/>

            <div className="form-group">
            <button className="btn btn-primary w-100 p-2" type="submit">Register</button>
            </div>
            
            <div className="form-group d-flex flex-column">
                Already have an account ?
                <Link className="btn btn-default text text-dark p-2"to="/signin">Sign in</Link>
            </div>
        </Form>
        </Formik>
        
        
        </div>
        </div>
        </div>

    )
}

export default userRegisterScreen
