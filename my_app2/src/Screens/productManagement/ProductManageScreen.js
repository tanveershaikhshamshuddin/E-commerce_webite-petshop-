import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState ,useEffect} from 'react'
import "./ProductManageScreen.css";
import FormikControl from './FormikControl'
import * as Yup from "yup";
import {SystemUpdateAlt,Delete,AddToPhotos,Search} from '@material-ui/icons';
import { CircularProgress} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { addProduct, deleteProduct, getProducts, searchProduct, updateProduct } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import MuiTable from './fomComponents/MuiTable';
import TextError from './TextError';

require("es6-promise");
require("isomorphic-fetch");

function ProductManageScreen() {
  const dispatch=useDispatch();
  const productAddManage=useSelector(state=>state.addProductDetails)
  const {addloading,addproduct,adderror}=productAddManage
  

  const deleteManage=useSelector(state=>state.deleteProductDetails)
  const {delete_loading,delete_error,delete_product}=deleteManage


  const productSearchManage=useSelector(state=>state.searchProductDetails)
  const {search_loading,search_error,search_product,search_success}=productSearchManage

  const updateManage=useSelector(state=>state.updateProductDetails)
  const {update_loading,update_error,update_product}=updateManage

  const getProductsManage=useSelector(state=>state.getProductsDetails)
  const {get_loading,get_error,get_products}=getProductsManage


  const categoryOptions=[
    {key:"pets",value:"pets"},
    {key:"medicines",value:"medicines"},
    {key:"foods",value:"foods"},
    {key:"accessory",value:"accessory"}
  ]
  const pet_typeOptions=[
    {key:"Select a pet type ",value:""},
    {key:"bird",value:"bird"},
    {key:"cat",value:"cat"},
    {key:"fish",value:"fish"},
    {key:"dog",value:"dog"},
    {key:"small_animals",value:"small_animals"}
  ]
  const initialValue={
    p_category:"",
    p_pet_type:"",
    p_name:"",
    p_quantity:"",
    p_price:"",
    p_description:"",
    p_image:"",
    p_exp_date:new Date(),
    p_manf_date:new Date()
  }
  const getCustomDate=(mydate)=>{
    const dte=new Date(mydate);
    const month=(dte.getMonth()+1)<10?("0"+(dte.getMonth()+1)):(dte.getMonth()+1)
    const date=(dte.getDate())<10?("0"+(dte.getDate())):(dte.getDate())
    const year=dte.getFullYear();
    console.log(year)
    const dt=year+"-"+month+"-"+date
    console.log(" dates from server  :",dt)
    return dt
  }
  
  function loadFormDatas(product){
    initialValue.p_category=product.p_category
    initialValue.p_pet_type=product.p_pet_type
    initialValue.p_name=product.p_name
    initialValue.p_quantity=product.p_quantity
    initialValue.p_price=product.p_price
    initialValue.p_description=product.p_description
    initialValue.p_image=product.p_image
    if(search_product.p_category==="medicines" || search_product.p_category==="foods" ){
      initialValue.p_exp_date=getCustomDate(product.p_exp_date)
      initialValue.p_manf_date=getCustomDate(product.p_manf_date);
    }
  }    

useEffect(() => {
  if(search_product){
    loadFormDatas(search_product);
  }
  
}, [search_product])
  
useEffect(() => {
  dispatch(getProducts())
}, [addproduct,update_product,delete_product])

  const validationSchema=Yup.object({
    p_name:Yup.string().required("Required"),
    p_price:Yup.number().required("Required"),
    p_image:Yup.string().required("Image url required"),
    p_quantity:Yup.number().required("Required"),
    p_category:Yup.string().required("Required"),
    p_pet_type:Yup.string().required("Required"),
    p_description:Yup.string().required("product description required "),
    p_exp_date:Yup.date().when('p_category',{
      is:'medicines',
      then:Yup.date().required("Expiry date is required")
    }).concat(Yup.date().when("p_category",{
      is:"foods",
      then:Yup.date().required()
      })).nullable(),

    p_manf_date:Yup.date().when('p_category',{
      is:'medicines',
      then:Yup.date().required("Manufacuring date is required")
    }).concat(Yup.date().when("p_category",{
      is:"foods",
      then:Yup.date().required()
    })).nullable(),
  });
  
 const addProductHandler=((values,{resetForm})=>{
  if(values.p_category!=="medicines" && values.p_category!=="foods"){
    delete values.p_exp_date;
    delete values.p_manf_date;
  } 
  console.log(values);
  dispatch(addProduct(values));
  resetForm({});
 })
  return (
    <div className="d-flex flex-wrap" style={{height:"80%",overflow:"auto"}}>
       <h2 className="bg bg-primary text-light w-100 text  text-italic">Manage Product</h2>
      <div className="col-lg-8 col-sm-12">
        
      <h2>
            {get_loading && <div><center><CircularProgress  color="secondary" /></center></div>}
            {get_error && <div><small><Alert severity="error">{get_error}</Alert></small></div>}
            {get_products && <div><MuiTable data={get_products} customDateFn={getCustomDate}/></div>}
        </h2>
        
      </div>
    <div className="d-flex  flex-column p-2 col-sm-12 col-lg-4" style={{height:"650px",overflow:"auto"}}>
  
        <h4>
            {addloading && <div><CircularProgress  color="secondary" /></div>}
            {adderror && <div><small><Alert severity="error">{adderror}</Alert></small></div>}
            {addproduct && <div><small><Alert severity="success" autohideduration={3000}>{addproduct}</Alert></small></div>}
        </h4>
        <h4>
            {update_loading && <div><CircularProgress  color="secondary" /></div>}
            {update_error && <div><small><Alert severity="error">{update_error}</Alert></small></div>}
            {update_product && <div><small><Alert severity="success" autohideduration={3000}>{update_product}</Alert></small></div>}
        </h4>       
        <h4>
            {delete_loading && <div><CircularProgress  color="secondary" /></div>}
            {delete_error && <div><small><Alert severity="error">{delete_error}</Alert></small></div>}
            {delete_product && <div><Alert severity="success">{delete_product}</Alert></div>}
        </h4>
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={addProductHandler}
      enableReinitialize
      >
        {
          (formik)=>{
            const deleteProductHandler=()=>{
              const search=document.getElementById("search_input").value;
              if(search){
                console.log({id:search_product._id,values:formik.values});

                dispatch(deleteProduct(search_product._id));
              }else{
                alert("Please select the required property");
              }
            }

            const updateProductHandler=()=>{
              if(search_product){
                console.log({id:search_product._id,values:formik.values});
                dispatch(updateProduct({id:search_product._id,values:formik.values}))
              }else{
                alert("Please select the required property");
              }
            }
            return (
        <Form>
          <h4>
            {search_loading && <div><CircularProgress  color="secondary" /></div>}
            {search_error && <div><small><Alert severity="error" autohideduration={4000}>{search_error}</Alert></small></div>}
            {search_success && <div><small><Alert severity="success" autohideduration={3000}>Product Found Successfully 😊</Alert></small>
            </div>}
        </h4>
        <div className="form-group">
        <FormikControl
        control="radio"
        name="p_category"
        label="Choose product Category"
        options={categoryOptions}
        />
        </div>
        
        <div className="form-group">
        <FormikControl
        control="select"
        name="p_pet_type"
        label="Select the pet type for the product"
        options={pet_typeOptions}
        
        className="form-control"
        />
        </div>
        <div className="form-group">
        <FormikControl
        control="input"
        type="text"
        name="p_name"
        
        label="Product name"
        className="form-control"
        />
        </div>
        
        <div className="form-group">
        <FormikControl
        control="input"
        type="text"
        name="p_image"
        label="Product Image Url"
        
        className="form-control"
        />
        </div>
        <div className="form-group">
        <FormikControl
        control="input"
        type="number"
        name="p_price"
        label="Product price"
        
        className="form-control"
        />
        </div>
        
        <div className="form-group">
        <FormikControl
        control="input"
        type="number"
        name="p_quantity"
        
        label="Product quantity"
        className="form-control"
        />
        </div>
      
        {
          (formik.values.p_category==="medicines" || formik.values.p_category==="foods")
          ?<>   
          <div className="form-group">
            <label htmlFor="p_manf_date">Manudfacturing date</label><br/>
            <Field type="date" id="p_manf_date" selected={formik.values.manf_date}className="form-control" name="p_manf_date"/><br/>
            <ErrorMessage name="p_manf_date"component={TextError}/>
            </div>
            
          <div className="form-group">
            <label htmlFor="p_exp_date">Expiry date</label><br/>
            <Field type="date"  id="p_exp_date"className="form-control" name="p_exp_date"/><br/>
            <ErrorMessage name="p_exp_date"component={TextError}/>
            </div>
        </>
        :null
        }
        <div className="form-group">
        <FormikControl
        control="textarea"
        name="p_description"
        label="Product Description"
        className="form-control"
        />
        </div>
        <div className="d-flex justify-content-center flex-wrap form-group">
        
        <button style={{backgroundColor:"#490C78",borderRadius:"999px"}}type="submit" className="btn  justify-content-center shadow col-sm-3 text-light  m-2 d-flex flex-1"><AddToPhotos/>Add </button>
        <div style={{backgroundColor:"orangered",borderRadius:"999px"}}  onClick={updateProductHandler} className="btn shadow col-sm-3  justify-content-center text-light  m-2 d-flex"><SystemUpdateAlt/>Update </div>
        <button type="button" style={{backgroundColor:"crimson",borderRadius:"999px"}} onClick={deleteProductHandler} className="btn shadow col-sm-3 shadow justify-content-center text-light  m-2 d-flex"><Delete/>Delete</button>
        </div>
        </Form>
            )
          }
        }
      </Formik>      
    </div>
    </div>
  )
}

export default ProductManageScreen
