import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Context/UseAxiosSecure';
import UseAuth from '../../Context/AuthContext/UseAuth';
import { useNavigate } from 'react-router';

const SendParcel = () => {
    const { register, control, handleSubmit,
        // watch, formState: { errors }

    } = useForm();
    const { user } = UseAuth();
    const navigate = useNavigate();

    //const axiosSecure = UseAxiosSecure();
    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region)
    const regions = [...new Set(regionsDuplicate)];
    const handleSendParcel = data => {
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const isDocument = data.parcelType === 'document';
        const parcelWeight = Number(data.parcelWeight);

        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const baseCost = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = extraWeight * 40;

                cost = baseCost + extraCharge;
                //data.cost = cost;
            }
        }

        console.log('total cost:', cost);
        data.cost = cost;
        Swal.fire({
            title: "Agree with the cost?",
            text: `The total shipping cost is ${cost} taka .`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and continue payment !"
        }).then((result) => {
            if (result.isConfirmed) {
                //proceed to . 
                fetch('http://localhost:3000/parcels', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            navigate('/dashboard/my-parcels');
                            Swal.fire(
                                {
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Parcel has created please pay ',
                                    showConfirmButton: false,
                                    timer: 2500
                                }
                            );
                        }
                    })

            }
        });
    };

    // const senderRegion = watch('senderRegion');//latest value nojor diye rakha hocche 
    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });
    const districtsByRegion = region => {
        const districts = serviceCenters.filter(c => c.region === region).map(d => d.district);
        return districts;

    }

    return (
        <div className="w-11/12 mx-auto my-12">
            <h2 className="text-5xl font-bold">Send a Parcel </h2>
            <form onSubmit={handleSubmit(handleSendParcel)}>

                {/*document*/}
                <div className="m-12 p-4">
                    <label className="label mr-4">
                        <input type="radio" {...register("parcelType")} value="document" className="radio" defaultChecked />
                        Document
                    </label>
                    <label className="label">
                        <input type="radio" {...register("parcelType")} value="non-document" className="radio" />
                        Non-Document
                    </label>
                </div>
                {/*parcel info name , weight */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-20">
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register("parcelName")} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Weight</label>
                        <input type="number" {...register("weight")} className="input w-full" placeholder="Weight (kg)" />

                    </fieldset>

                </div>
                {/*two column*/}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-20 my-12">
                    <fieldset className="fieldset gap-4">
                        <h2 className='text-5xl font-bold'>Sender Information</h2>
                        <label className="label">Sender Name </label>
                        <input defaultValue={user?.displayName} type="text" {...register("senderName")} className="input w-full" placeholder="Sender Name" />
                        <label className="label">Sender Email</label>
                        <input type="email" defaultValue={user?.email}{...register("senderEmail")} className="input w-full" placeholder="Sender Name" />
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender Region</legend>
                            <select {...register("senderRegion")} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>

                                {
                                    regions.map((region, idx) => <option value={region} key={idx}>{region}</option>)
                                }
                            </select>
                            <span className="label">Optional</span>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Sender District</legend>
                            <select {...register("senderDistrict")} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a district </option>

                                {
                                    districtsByRegion(senderRegion).map((district, idx) => <option value={district} key={idx}>{district}</option>)
                                }
                            </select>
                            <span className="label">Optional</span>
                        </fieldset>


                        <label className="label">Sender Address</label>
                        <input type="text" {...register("senderAddress")} className="input w-full" placeholder="Sender Address" />
                    </fieldset>
                    <fieldset className="fieldset gap-4 ">
                        <h2 className='text-5xl font-bold'>Receiver Information</h2>
                        <label className="label">Receiver Name </label>
                        <input type="text" {...register("receiverName")} className="input w-full" placeholder="Receiver Name" />
                        <label className="label">Receiver Email</label>
                        <input type="email" {...register("receiverEmail")} className="input w-full" placeholder="Receiver Email" />
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver Region</legend>
                            <select {...register("receiverRegion")} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>

                                {
                                    regions.map((region, idx) => <option value={region} key={idx}>{region}</option>)
                                }
                            </select>
                            <span className="label">Optional</span>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Receiver District</legend>
                            <select {...register("receiverDistrict")} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a district </option>

                                {
                                    districtsByRegion(receiverRegion).map((district, idx) => <option value={district} key={idx}>{district}</option>)
                                }
                            </select>
                            <span className="label">Optional</span>
                        </fieldset>
                        <label className="label">Receiver Address</label>
                        <input type="text" {...register("receiverAddress")} className="input w-full" placeholder="Receiver Address" />
                    </fieldset>
                </div>
                <div></div>
                <input type="submit" value="Send Parcel" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default SendParcel;