import React from 'react';
import { useLoaderData } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';

const ProductDetails = () => {
    const category = useLoaderData()
    // const {name, published_date, company_img, thumbnail_url , image_url, price, condition, _id} = category
    console.log(category);
    return (
        <div>
            <AddProduct
                category={category} key={category._id}
            ></AddProduct>
        </div>
    );
};

export default ProductDetails;