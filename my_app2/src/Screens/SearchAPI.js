import axios from 'axios'
import {React,useEffect,useState} from 'react'

export default function SearchAPI(query,pageNumber) {
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    const [products,setProducts]=useState([]);
    const [hasMore,setHasMore]=useState(false);

useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel
    axios({
        method:"GET",
        url:"/api/product_manage/getproducts",
       params:{q:query,page:pageNumber},
        cancelToken: new  axios.CancelToken((c)=>cancel=c)
    }).then(res=>{
        setProducts(prevProducts=>{
            return [...prevProducts,...res.data.map(p=>p.p_name)]
        })
        setHasMore(res.data.length>0);
        setLoading(false);
        console.log(res.data)
    }).catch(err=>{
        if(axios.isCancel(err)) return //ignore every single time we cancel the request becauze we meant to cancel it ;
        setError(true);
    })
    return ()=> cancel()
}, [query,pageNumber])
    return {loading,products,error,hasMore}
}
