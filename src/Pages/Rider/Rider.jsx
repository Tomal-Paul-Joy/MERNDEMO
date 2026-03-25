import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAuth from '../../Context/AuthContext/UseAuth';
import { useLoaderData } from 'react-router';

const Rider = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()
    const { user } = UseAuth()
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const riderRegion = useWatch({ control, name: 'riderRegion' });
    const regions = [...new Set(regionsDuplicate)];
    const districtsByRegion = region => {
        const districts = serviceCenters.filter(c => c.region === region).map(d => d.district);
        return districts;

    }
    const handleRiderData = data => {
        console.log(data)
        fetch('http://localhost:3000/riders', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(res => res.json())
            .then(r => {
                console.log(r)
            })
    }









    return (
        <div className='w-11/12 mx-auto'>
            <h2 className="text-5xl">Be a rider </h2>
            <form onSubmit={handleSubmit(handleRiderData)}>


                <div className="grid md:grid-cols-2 grid-cols-1 gap-20 my-12">
                    <fieldset className="fieldset gap-4">
                        <h2 className='text-5xl font-bold'>Rider Information</h2>
                        <label className="label">Rider Name </label>
                        <input defaultValue={user?.displayName} type="text" {...register("riderName")} className="input w-full" placeholder="Sender Name" />
                        <label className="label">Rider Email</label>
                        <input type="email" defaultValue={user?.email}{...register("riderEmail")} className="input w-full" placeholder="Sender Name" />
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Rider Region</legend>
                            <select {...register("riderRegion")} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>

                                {
                                    regions.map((region, idx) => <option value={region} key={idx}>{region}</option>)
                                }
                            </select>
                            <span className="label">Optional</span>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Rider District</legend>
                            <select {...register("riderDistrict")} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a district </option>

                                {
                                    districtsByRegion(riderRegion).map((district, idx) => <option value={district} key={idx}>{district}</option>)
                                }
                            </select>
                            <span className="label">Optional</span>
                        </fieldset>


                        <label className="label">Rider Address</label>
                        <input type="text" {...register("riderAddress")} className="input w-full" placeholder="Sender Address" />
                    </fieldset>
                    <fieldset>

                        <h2 className='text-5xl font-bold'>More Info</h2>
                        <label className="label">License</label>
                        <input type="text" {...register("license")} className="input w-full" placeholder="License" />
                        <label className="label">NID</label>
                        <input type="text" {...register("nid")} className="input w-full" placeholder="Nid" />
                        <label className="label">Bike</label>
                        <input type="text" {...register("nid")} className="input w-full" placeholder="bike" />



                    </fieldset>
                </div>
                <input type="submit" value="Submit Information" className="btn btn-primary" />
            </form>






        </div>
    );
};

export default Rider;