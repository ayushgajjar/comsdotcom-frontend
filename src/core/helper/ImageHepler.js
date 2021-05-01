import React from 'react'
import { API } from '../../backend';
import { Card } from 'react-bootstrap'

const ImageHepler = ({product}) => {
    const imageurl= product ? `${API}/product/photo/${product._id}` : ""
    return (
            <Card.Img
                src={imageurl}
                variant='top'
                alt={product.name} fluid
            />
    )
}

export default ImageHepler;
