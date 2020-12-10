import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import './SignInScreen.css';
import * as Yup from "yup";
import TextError from './productManagement/TextError';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


function SignInScreen(props) {
    const userSignin=useSelector(state=>state.userSignin);
    const {loading,userInfo,error}=userSignin
    
    const dispatch=useDispatch();
    
    const onSubmit=(values,{resetForm})=>{
        const {email,password}=values
        console.log(email,password);
        dispatch(signin(email,password));
        resetForm({});
    }
    useEffect(() => {
        if(userInfo){
            props.history.push("/");
        }
    }, [userInfo]);
    const initialValue={
        email:"",
        password:""
    }
    const  validationSchema=Yup.object({
        password:Yup.string().min(6,"password must be greater than 6 characters").required("Required !!"),
        email:Yup.string().email("Invalid email address").required("Required !")
    });

    return (
        <div className="SignInForm ">
            <div className="main_form">
        <div className="container">
        <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
        <div className="container  mt-5 shadow-lg p-5 col-lg-8">
        <h1 className="text text-italic">SignIn</h1>
        <h4>
            {loading && <div><CircularProgress  color="secondary" /></div>}
            {error && <div><small><Alert severity="error">{error}</Alert></small></div>}
        </h4>
        <Form action=""  method="post">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field id="email" className="form-control" type="email" placeholder="Enter your email" autoComplete="off" name="email"/>
                <ErrorMessage  component={TextError} name="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password </label>
                <Field id="password" className="form-control" type="password" placeholder="Enter your password" autoComplete="off" name="password"/>
                <ErrorMessage   component={TextError} name="password"/>
            </div>
            <br/>
            <div className="form-group">
            <button className="btn btn-primary w-100 text text-italic  p-2" type="submit"><strong>SignIn</strong></button>
            </div>
            
            <div className="form-group d-flex flex-column">
                New to petshop ?
            <button className="btn btn-default "><Link className="text text-decoration-none text-dark" to="/register"><small>Create an Account</small></Link></button>
            </div>
        </Form>
        </div>  
        </Formik>
        
        </div>
        </div>
        </div>
    )
}

export default SignInScreen
