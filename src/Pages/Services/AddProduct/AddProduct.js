import React from 'react';

const AddProduct = ({category}) => {
    console.log(category);
    return (
        <h2>{category.name}</h2>
        // <div className='w-96 p-7'>
        //     <h2 className="text-2xl">Add Doctor</h2>
        //     <form onSubmit={''}>
        //         <div className="form-control w-full max-w-xs">
        //             <label className="label"> <span className="label-text">Name</span></label>
        //             <input type="text" {...register("name", {
        //                 required: "Name is Required"
        //             })} className="input input-bordered w-full max-w-xs" />
        //             {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        //         </div>
        //         <div className="form-control w-full max-w-xs">
        //             <label className="label"> <span className="label-text">Email</span></label>
        //             <input type="email" {...register("email", {
        //                 required: true
        //             })} className="input input-bordered w-full max-w-xs" />
        //             {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        //         </div>
        //         <div className="form-control w-full max-w-xs">
        //             <label className="label"> <span className="label-text">Specialty</span></label>
        //             <select 
        //             {...register('specialty')}
        //             className="select input-bordered w-full max-w-xs">
        //                 {
        //                     specialties.map(specialty => <option
        //                         key={specialty._id}
        //                         value={specialty.name}
        //                     >{specialty.name}</option>)
        //                 }
                        
                        
        //             </select>
        //         </div>
        //         <div className="form-control w-full max-w-xs">
        //             <label className="label"> <span className="label-text">Photo</span></label>
        //             <input type="file" {...register("image", {
        //                 required: "Photo is Required"
        //             })} className="input input-bordered w-full max-w-xs" />
        //             {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
        //         </div>
        //         <input className='btn btn-accent w-full mt-4' value="Add A Doctor" type="submit" />
        //     </form>
        // </div>
    );
};

export default AddProduct;