import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import AddProduct from '../AddProduct/AddProduct';
import SingleProductDetails from './SingleProductDetails';

const ProductDetails = () => {
    const category = useLoaderData()
    // const {name, published_date, company_img, thumbnail_url , image_url, price, condition, _id} = category
    // console.log(category);

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`http://localhost:5000/add-product/${category._id}`)
            .then(res => res.json())

    })
    console.log('product:', products);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

            <div className='col-span-2'>
                <div className='grid gap-6 grid-cols-1 md:grid-cols-2  mt-6'>
                    {
                        products.map(product => <SingleProductDetails
                            key={product._id}
                            product={product}
                        ></SingleProductDetails>)
                    }
                </div>
            </div>

            <AddProduct className="w-5/2"
                category={category} 
                key={category._id}
                refetch={refetch}
            ></AddProduct>
        </div>
    );
};

export default ProductDetails;