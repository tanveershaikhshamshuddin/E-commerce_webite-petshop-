import axios from "axios";

import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
     PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
      PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
       PRODUCT_SEARCH_FAIL, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_REQUEST,
        PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_DELETE_REQUEST,
         PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_UPDATE_SUCCESS,
          PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, PRODUCTS_GET_FAIL, GET_HINT_FAIL, GET_HINT_SUCCESS, GET_HINT_REQUEST, GET_SUGGESTION_REQUEST, GET_SUGGESTION_SUCCESS, GET_SUGGESTION_FAIL}  from "../constants/productConstant";

const listProducts = () => async (dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_LIST_REQUEST
        });
    const  { data } =await axios.get("/api/products");
    dispatch({
        type:PRODUCT_LIST_SUCCESS,
        payload:data
    });
    
    }catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.message
        })
    }
}

const detailsProduct=(productId)=>async (dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST,
            payload:productId
        });
        const {data} = await axios.get("/api/product/"+productId);
        console.log(data);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        });
    }catch(err){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:err
        })
    }
}
//shuru kar idhr se
const addProduct=(values)=>async(dispatch,getState)=>{
    const {userSignin:{userInfo}}=getState();

    try{
        dispatch({
            type:PRODUCT_SAVE_REQUEST,
            payload:values
        })
        const {data}=await axios.post("/api/product_manage/addproduct",values,{
            headers:{
                'Authorization':"Bearer "+userInfo.token
            }
        });
        console.log("Message from server",data.message);
        dispatch({
            type:PRODUCT_SAVE_SUCCESS,
            payload:data.message
        })
    }catch(e){
        dispatch({
            type:PRODUCT_SAVE_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}
const searchProduct=(values)=>async(dispatch)=>{
    try{
        console.log(values);
        dispatch({
            type:PRODUCT_SEARCH_REQUEST,
            payload:values
        })
        const {data}=await axios.post("/api/product_manage/searchproduct",values);
        dispatch({
            type:PRODUCT_SEARCH_SUCCESS,
            payload:data.message
        })
    }catch(e){
        dispatch({
            type:PRODUCT_SEARCH_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}

const updateProduct=(values)=>async(dispatch)=>{
    try{
        console.log(values);
        const id=values.id;
        const val=values.values
        dispatch({
            type:PRODUCT_UPDATE_REQUEST,
            payload:val
        })
        const {data}=await axios.put("/api/product_manage/updateproduct/"+id+"",val);
        console.log("Data :",data);
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data.message
        })
    }catch(e){
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}

const deleteProduct=(id)=>async(dispatch)=>{
    try{
        console.log(id);
        dispatch({
            type:PRODUCT_DELETE_REQUEST,
            payload:id
        })
        const {data}=await axios.delete("/api/product_manage/deleteproduct/"+id);
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
            payload:data.message
        })
    }catch(e){
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}

const getProducts = () => async (dispatch)=>{
    try{
        dispatch({
            type:PRODUCTS_GET_REQUEST
        });
    const  { data } =await axios.get("/api/product_manage/getproducts");
    dispatch({
        type:PRODUCTS_GET_SUCCESS,
        payload:data
    });
    
    }catch(e){
        dispatch({
            type:PRODUCTS_GET_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}

const getSearchHint = () => async (dispatch)=>{
    try{
        dispatch({
            type:GET_HINT_REQUEST
        });
    const  { data } =await axios.get("/api/product_manage/products/search_hints");
    dispatch({
        type:GET_HINT_SUCCESS,
        payload:data.message
    });
    
    }catch(e){
        dispatch({
            type:GET_HINT_FAIL,
            payload:e.response && e.response.data.message ? e.response.data.message :e.message
        })
    }
}



export  { listProducts,detailsProduct,
    addProduct,searchProduct,
    updateProduct,deleteProduct,
    getProducts,getSearchHint,
    
};

