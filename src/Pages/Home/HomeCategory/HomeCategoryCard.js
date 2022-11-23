import React from 'react';
import { Link } from 'react-router-dom';

const HomeCategoryCard = ({ category }) => {
    console.log(category);
    const { company_img, company_name, details, image_url, name, _id } = category;
    return (
        <div className="card extra-style card-compact w-100 bg-base-100 shadow-2xl">

            <figure><img className='h-52' src={image_url} alt="" /></figure>

            <div className="card-body">
                <h2 className="card-title">{name}</h2>
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
                            <p className='text-2xl text-blue-500 font-semibold'>Company: {company_name}</p>
                        </div>
                        <div className="card-actions ">
                            <Link to={`/services/${_id}`}>
                                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">See All</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeCategoryCard;