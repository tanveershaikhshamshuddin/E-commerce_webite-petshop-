import Axios from "axios";
import { USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstant";
//------Sign in-------------//
const signin=(email,password)=>async (dispatch)=>{
    dispatch({
        type:USER_SIGNIN_REQUEST,
        payload:{
            email,
            password
        }
    });
    
    try{
        const  {data}=await Axios.post("/api/user/signin",{email,password});
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo',JSON.stringify(data));
    }catch(e){
        console.log(e.message);
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}

//------Logout-------------//
const logout=()=>(dispatch)=>{
    localStorage.removeItem("userInfo");
    dispatch({
        type:USER_LOGOUT
    })
}

//----------Register----------//
const register=(name,email,phoneno,password)=>async (dispatch)=>{
    console.log("into register dispatch");
    dispatch({
        type:USER_REGISTER_REQUEST,
        payload:{
            name,
            email,
            phoneno,
            password
        }
    });
    
    try{
        const  {data}=await Axios.post("/api/user/register",{name,email,phoneno,password});
        console.log("data",data.message);
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data.message
        })
        
    }catch(e){
        
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}
export {signin,register,logout}