import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import HomeCategoryCard from './HomeCategoryCard';

const HomeCategory = () => {
    const { data: homeCategory = [], refetch, isLoading } = useQuery({
        queryKey: ['home-phone-category'],
        queryFn: () => fetch('https://assignment-12-server-site-eight.vercel.app/products-category')
            .then(res => res.json())
    
    })
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='my-5'>
            <h2 className='text-3xl text-center font-semibold'>New Arrival Phones!</h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    homeCategory.map(category => <HomeCategoryCard
                        key={category._id}
                        category={category}
                    ></HomeCategoryCard>)
                }
            </div>

        </div>
    );
};

export default HomeCategory;