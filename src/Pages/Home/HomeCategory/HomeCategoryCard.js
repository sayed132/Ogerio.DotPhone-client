import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/PrimaryButton';

const HomeCategoryCard = ({ category }) => {
    console.log(category);
    const { company_img, category_name, price, details, image_url, name, _id } = category;
    return (
        <div className="card extra-style card-compact w-100 bg-base-100 shadow-2xl">

            <figure><img className='h-52' src={image_url} alt="" /></figure>

            <div className="card-body">
                <div className='flex justify-between items-center'>
                <h2 className="card-title">{name}</h2>
                <h3 className="card-title text-blue-700">{category_name}</h3>
                
                </div>
                <div>
                    <div style={{ margin: '0% 0% 30% 0%' }} className=''>
                        {
                            details.length > 100 ?
                                <>{details.slice(0, 99) + '...'} </>
                                :
                                details
                        }
                    </div>

                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-2xl text-orange-500 font-semibold'>Price: {price}</p>
                        </div>
                        <div className="card-actions ">
                            <Link to={`/products/${category_name}`}>
                                <PrimaryButton>See All</PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCategoryCard;