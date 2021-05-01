import React from 'react'
import { API } from '../../backend'


export const getProducts = () => {
    return fetch(`${API}/products`,{method: "GET"})
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err));
}
export const getProductsById = (productId) => {
    return fetch(`${API}/product/${productId}`,{method: "GET"})
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err));
}