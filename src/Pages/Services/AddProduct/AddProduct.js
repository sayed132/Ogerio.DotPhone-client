import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const AddProduct = ({ category, refetch }) => {
    const {user} = useContext(AuthContext)
    console.log(category);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imagebb_key;

    // const { data: addProducts, isLoading } = useQuery({
    //     queryKey: ['specialty'],
    //     queryFn: async () => {
    //         const res = await fetch('http://localhost:5000/add-product');
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    const handleAddProduct = data => {
        const name = user?.displayName;
        const email = user?.email;
        const categoryId = category._id
        const time = new Date().toLocaleString();
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const product = {
                        categoryId ,
                        productName: data.name,
                        productLocation: data.location,
                        uses: data.uses,
                        resellPrice: data.resell_price,
                        originalPrice: data.original_price,
                        details: data.details,
                        category_name: data.category_name,
                        postedTime: time,
                        sellerName: name,
                        sellerEmail: email,
                        image: imgData.data.url
                    }

                    // save doctor information to the database
                    fetch('http://localhost:5000/add-product', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`);
                            refetch()
                            navigate(`/products/${category?._id}`)
                        })
                }
            })
    }

    
    return (
        <div className='w-96 p-7'>
            <h2 className="text-2xl">Add Products {category.name} Categories</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Phone Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Location</span></label>
                    <input type="text" {...register("location", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Years of Uses</span></label>
                    <input type="text" {...register("uses", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Resell Price</span></label>
                    <input type="text" {...register("resell_price", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Original Price</span></label>
                    <input type="text" {...register("original_price", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Details About Phone</span></label>
                    <input type="text" {...register("details", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Phone Category</span></label>
                    <input type="text" {...register("category_name", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-4' value="Add A Doctor" type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;