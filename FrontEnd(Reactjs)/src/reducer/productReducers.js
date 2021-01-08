import { PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_FAIL,PRODUCT_DELETE_SUCCESS,
     PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
      PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
       PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS,
        PRODUCT_SEARCH_FAIL, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS,
        PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_SUCCESS,PRODUCT_UPDATE_FAIL,
         PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, PRODUCTS_GET_FAIL, GET_HINT_REQUEST, GET_HINT_SUCCESS, GET_HINT_FAIL } from "../constants/productConstant";

function productListReducers(state={products:[]},action){
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{
                loading:true
            };
        case PRODUCT_LIST_SUCCESS:
            return{
                loading:false,
                products:action.payload
                };
        case PRODUCT_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            };
        default :return state;
    }
}

function productDetailsReducers(state={product:{}},action){
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading:true
            };
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading:false,
                product:action.payload
                };
        case PRODUCT_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            };
        default :return state;
    }
}

function addProductDetailsReducer(state={product:{}},action){
    switch(action.type){
        case PRODUCT_SAVE_REQUEST:
            return{
                addloading:true
            };
        case PRODUCT_SAVE_SUCCESS:
            return{
                addloading:false,
                addsuccess:true,
                addproduct:action.payload
                };
        case PRODUCT_SAVE_FAIL:
            return{
                addloading:false,
                adderror:action.payload
            };
        default :return state;
    }
}

function searchProductDetailsReducer(state={product:{}},action){
    switch(action.type){
        case PRODUCT_SEARCH_REQUEST:
            return{
                search_loading:true
            };
        case PRODUCT_SEARCH_SUCCESS:
            return{
                search_loading:false,
                search_success:true,
                search_product:action.payload
                };
        case PRODUCT_SEARCH_FAIL:
            return{
                search_loading:false,
                search_error:action.payload
            };
        default :return state;
    }
}


function updateProductDetailsReducer(state={product:{}},action){
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return{
                update_loading:true
            };
        case PRODUCT_UPDATE_SUCCESS:
            return{
                update_loading:false,
                update_product:action.payload
                };
        case PRODUCT_UPDATE_FAIL:
            return{
                update_loading:false,
                update_error:action.payload
            };
        default :return state;
    }
}

function deleteProductDetailsReducer(state={product:{}},action){
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return{
                delete_loading:true
            };
        case PRODUCT_DELETE_SUCCESS:
            return{
                delete_loading:false,
                delete_product:action.payload
                };
        case PRODUCT_DELETE_FAIL:
            return{
                delete_loading:false,
                delete_error:action.payload
            };
        default :return state;
    }
}

function getProductsDetailsReducer(state={products:[]},action){
    switch(action.type){
        case PRODUCTS_GET_REQUEST:
            return{
                get_loading:true
            };
        case PRODUCTS_GET_SUCCESS:
            return{
                get_loading:false,
                get_products:action.payload
                };
        case PRODUCTS_GET_FAIL:
            return{
                get_loading:false,
                get_error:action.payload
            };
        default :return state;
    }
}

function getSearchHintReducer(state={products:[]},action){
    switch(action.type){
        case GET_HINT_REQUEST:
            return{
                hint_loading:true
            };
        case GET_HINT_SUCCESS:
            return{
                hint_loading:false,
                hint_products:action.payload
                };
        case GET_HINT_FAIL:
            return{
                hint_loading:false,
                hint_error:action.payload
            };
        default :return state;
    }
}

export {productListReducers,productDetailsReducers,addProductDetailsReducer
    ,deleteProductDetailsReducer,searchProductDetailsReducer,updateProductDetailsReducer,
    getProductsDetailsReducer,getSearchHintReducer

};