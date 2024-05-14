import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useQuery } from '../../components/hooks/useQuery';


const ArtistDetailsPage = () => {

    const [artist, setArtist] = useState([])
    const artistName = useQuery('artist')


    useEffect(() => {
        const fetchArtist = async () => {
            try {
                // I'm not sure this this enpoint exists
                const response = await axios.get(`/api/artist?artist=${artistName}`)
                setArtist(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchArtist()
    }, [])


    return (
        <div>
            <h1 className="artist-details-header">Artist Details</h1>
            <div className="artist-details">
                <img className="artist-details__image" src="artist-image-url" alt="Artist" />
                <h2 className="artist-details__name">Artist Name</h2>
                <p className="artist-details__description">Artist Description</p>
                <h3 className="artist-details__popular-songs">Popular Songs</h3>
                <div className="artist-details__songs">
                    <div className="artist-details__song">Song 1</div>
                    <div className="artist-details__song">Song 2</div>
                    <div className="artist-details__song">Song 3</div>
                </div>
            </div>
        </div>
    );
}

export default ArtistDetailsPage;