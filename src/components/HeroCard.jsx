import React from 'react';
const HeroCard = ({ name, location, description, imageUrl }) => {
    return (
        <div  className='bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm'>
            <img 
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover"
            />
            
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                <p className='text-sm text-gray-500 italic'>{location}</p>
                <p className="mt-2 text-gray-700 text-sm">{description}</p>
                <div className="mt-4 flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white 
                text-sm rounded hover:bg-blue-700">
                    Read More 
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 text-sm 
                    rounded hover:bg-gray-300">
                        Share
                    </button>
                </div>




        </div>
        </div>
    );

}
export default HeroCard;