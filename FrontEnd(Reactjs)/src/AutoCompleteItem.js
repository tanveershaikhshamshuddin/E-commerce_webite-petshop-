import React from 'react'
import "./AutoCompleteItem.css";

function AutoCompleteItem() {
    return (
        
        <li className="list-group-item">
        <div className="row">
            <div className="col text-left">
                <p className="mb-0 font-weight-bold">
                    Country Name{""}
                    <img src="" alt=""/>
                </p>
                <p className="mb-0 badge badge-primary">contained</p>
                <p className="mb-0 ml-2 badge badge-secondary">Capital</p>
            </div>
        </div>
    </li>
        
    )
}

export default AutoCompleteItem
