import { Badge, CircularProgress, IconButton, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './productCard'
import SearchAPI from './SearchAPI';
import Roll from "react-reveal/Roll"
import {Waypoint} from "react-waypoint";
import {MoreVert, ShoppingCart} from "@material-ui/icons";
import { Link, NavLink, useHistory } from 'react-router-dom';
function Specific_product(props) {
    const [page,setPage]=useState(1);
    const category=props.match.params.category;
    const pet_type=props.match.params.pet_type;
    const limit=6;
    const history=useHistory();
    const [products,setProducts]=useState([]);
    const [hasNextPage,setHasNextPage]=useState(true);
    useEffect(() => {
        getData()
        console.log(category);
    }, []);

    const getData=()=>{
        console.log(`pet_type :${pet_type} and category ${category}`)
        axios({
            method:"GET",
            url:`/api/product_manage/products/pet?page=${page}&limit=${limit}&pet_type=${pet_type}&category=${category}`
        }).then(({data})=>{
            const {next,prev,results}=data.message
            setProducts(products=>[...products,...results]);
            if(next){
                setHasNextPage(true)
                setPage(page+1);
            }else{
                setHasNextPage(false);
            }
            console.log(results);
        })
    }
    const loadMoreData=()=>{
        if(page>1){
            getData();
        }
    }
    const all_category=[
        {category:"Pets",value:"pets"},
        {category:"Foods",value:"foods"},
        {category:"Medicines",value:"medicines"},
        {category:"Accessory",value:"accessory"}
    ]
    return (
    <div className="search_Screen">
      
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm" style={{height:"2.5rem"}}>
    <ul className="d-flex" style={{textDecoration:"none",listStyleType:"none"}}>
    <li className="nav-item">
            <a className="nav-link" href={`/specific_pet_products/${pet_type}/pets`} >Pets</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href={`/specific_pet_products/${pet_type}/foods`} >Foods</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href={`/specific_pet_products/${pet_type}/medicines`}>Medicines</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href={"/specific_pet_products/"+pet_type+"/accessory"}>Accessory</a>
        </li>
    </ul>
</nav>
            <div className="container py-4">
            <Roll>
            <div className="row" >
                {
                    products.map((product,index)=>{
                        return (<div key={index}>
                           <ProductCard product={product} image={product.p_image} name={product.p_name} price={product.p_price} id={product._id}/>
                        </div>)
                    })
                }
            </div>
            </Roll>
            <br/>
            {
                hasNextPage && (
                <Waypoint onEnter={loadMoreData}>
                <center><CircularProgress  color="secondary" /></center>
                </Waypoint>
                )
                
            }
            
        </div>
   
    </div>
    )
}
export default Specific_product
