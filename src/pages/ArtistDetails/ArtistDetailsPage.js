import React from 'react';

const ArtistDetailsPage = () => {
    return (
        <div>
            <h1>Artist Details</h1>
            <div className="artist-details">
                <img className="artist-details__image" src="artist-image-url" alt="Artist" />
                <h2 className="artist-details__name">Artist Name</h2>
                <p className="artist-details__description">Artist Description</p>
            </div>
        </div>
    );
}

export default ArtistDetailsPage;