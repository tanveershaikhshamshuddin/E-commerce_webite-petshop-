import { Badge, CircularProgress, IconButton, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './productCard'
import SearchAPI from './SearchAPI'
import {Waypoint} from "react-waypoint";
import {MoreVert, ShoppingCart} from "@material-ui/icons";
import { Link } from 'react-router-dom';
function SearchScreen(props) {
    const [page,setPage]=useState(1);
    const query=props.match.params.query;
    const limit=6;
    const [products,setProducts]=useState([]);
    const [hasNextPage,setHasNextPage]=useState(true);
    useEffect(() => {
        getData()
    }, [query]);

    const getData=()=>{
        
        axios({
            method:"GET",
            url:`/api/product_manage/products/search_suggestion?page=${page}&limit=${limit}&p_query=${query}`
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
    return (
    <div className="search_Screen">
      
            <div className="container py-4">
            
            <div className="row" >
                {
                    products.map((product,index)=>{
                        return (<div key={index}>
                           <ProductCard product={product} image={product.p_image} name={product.p_name} price={product.p_price} id={product._id}/>
                        </div>)
                    })
                }
            </div><br/>
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
export default SearchScreen
