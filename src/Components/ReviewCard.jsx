import React from 'react';
//  "id": "5f47ac10b4f1c03e8c123456",
//     "user_email": "john.doe@example.com",
//     "userName": "John Doe",
//     "delivery_email": "delivery1@example.com",
//     "ratings": 4.5,
//     "review": "Smooth delivery and polite staff.",
//     "parcel_id": "5f47ac10b4f1c03e8c654321",
//     "pick_up_email": "pickup1@example.com",
//     "user_photoURL": "https://randomuser.me/api/portraits/men/10.jpg",
//     "date": "2024-05-08T14:30:00.000Z"

const ReviewCard = ({ preview }) => {
    console.log(preview)
    const { userName, user_photoURL, review } = preview;
    return (
        <div className="max-w-sm bg-base-100 shadow-lg rounded-xl p-6 border border-gray-200">
            <div className="card card-side bg-base-100 shadow-sm">
                <figure>
                    <img
                        src={user_photoURL}
                        alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{userName}</h2>
                    <p>{review}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;