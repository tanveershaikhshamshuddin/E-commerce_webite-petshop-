import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from "./DataTable";

require("es6-promise");
require("isomorphic-fetch");

function ProductsTable() {
    const [data,setData]=useState([]);
    const [q,setQ]=useState("");
    useEffect(() =>async()=> {
        const response=await Axios.get("/api/product_manage/getproducts");
        console.log(response);
        const res=response.json()
        setData(res);
    }, []);
    
    function searchfn(rows){
        const columns=rows[0] && Object.keys(rows[0]);
        return rows.filter(row => 
            columns.some(
                (column)=> row[column].toString().toLowerCase().indexOf(q.toLowerCase()>-1)
            )
            )
    }
    return (
        <div>
            <div className="form-group">
                <input type="text" value={q} className="form-control"placeholder="Search product here" onChange={(e)=> setQ(e.target.value)} />
            </div>
            <div>
                {
                    <h4>Value of Q :{data}</h4>
                }
            </div>
        </div>
    )
}

export default ProductsTable
