import { CircularProgress, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './productCard'
import {Waypoint} from "react-waypoint";
import Fade from "react-reveal/Fade";
import "./HomeScreen.css";
import { Link } from 'react-router-dom';

function HomeScreen(props) {
    const [page,setPage]=useState(1);
    const limit=12;
    const [products,setProducts]=useState([]);
    const [hasNextPage,setHasNextPage]=useState(true);
    useEffect(() => {
        getData()
    }, []);
    const getData=()=>{
        axios({
            method:"GET",
            url:`/api/product_manage/products?page=${page}&limit=${limit}`
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
    const pets=[
        {breed:"Cat",val:"cat",url:"https://i2.wp.com/www.funmag.org/wp-content/uploads/2016/06/cute-cats-wallpaper-20-photos-1.jpg"},
        {breed:"Dog",val:"dog",url:"https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733__340.jpg"},
        {breed:"Fish",val:"fish",url:"https://upload.wikimedia.org/wikipedia/commons/2/2d/Synchiropus_splendidus_2_Luc_Viatour.jpg"},
        {breed:"Birds",val:"bird",url:"https://www.featurepics.com/StockImage/20120207/exotic-birds-stock-image-2144014.jpg"},
        {breed:"Small Animals",val:"small_animals",url:"https://goldwallpapers.com/uploads/posts/cute-hamster-wallpaper/cute_hamster_wallpaper_003.jpg"},
    ]
    return (
        <div className="container py-4">
            <div className="pet_category">
            {
                pets.map((pet,index)=>{
                    return(
                        <div key={index}>
                            <div className="round">
                               <img src={pet.url} onClick={()=>props.history.push(`/specific_pet_products/${pet.val}/pets`)} alt=""/>
                            </div>
                            <div className="text" style={{cursor:"pointer"}}onClick={()=>props.history.push(`/specific_pet_products/${pet.val}/pets`)}>
                                {pet.breed}
                            </div>
                        </div>
                        )
                })
            }
            </div>
            <Fade left cascade>
            <div className="row d-flex justify-content-center align-items-center" >
                {
                    products.map((product,index)=>{
                        return (<div key={index}>
                           <ProductCard product={product} image={product.p_image} name={product.p_name} price={product.p_price} id={product._id}/>
                        </div>)
                    })
                }
            </div>
            </Fade>
            <br/>
            {
                hasNextPage && (
                <Waypoint onEnter={loadMoreData}>
                <center><CircularProgress  color="secondary" /></center>
                </Waypoint>
                )
                
            }
        </div>

    )
}
export default HomeScreen
