import React from 'react';
import './InfoCard.css';

export const InfoCard = ({ title, data, image }) => {
    return (
        <div className='info-card-container'>
            <div className='info-card-header'>
                <h2>{title}</h2>
            </div>
            {image && (
                <div className='info-card-img'>
                    <img src={image} alt="Info Card" />
                </div>
            )}
            <div className='info-card-body'>
                {Object.entries(data).map(([key, value]) => (
                    key !== 'title' && (
                        <div className='info-card-data-item' key={key}>
                            <div className='info-card-data-item-header'>
                                <p>{key}</p>
                            </div>
                            <div className='info-card-data-item-body'>
                                <p>{value}</p>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};