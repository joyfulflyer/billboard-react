import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useQuery } from '../../components/hooks/useQuery';
import styles from "./artistDetailsPage.module.scss";


const ArtistDetailsPage = () => {

    const [songs, setSongs] = useState([])
    const [artistName, setArtistName] = useState('')
    const query = useQuery('artist')


    useEffect(() => {
        const fetchArtist = async () => {
            try {
                // I'm not sure this this enpoint exists
                const response = await axios.get(`/api/artist?artist=${query}`)
                setSongs(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchArtist()
    }, [])

    useEffect(() => {
        console.log(songs)
        if (songs.length > 0) {
            setArtistName(songs[0].artist)
        }
    }, [songs])


    return (
        <div>
            <h1 className="artist-details-header">Artist Details</h1>
            <div className="artist-details">
                <img className="artist-details__image" src="artist-image-url" alt="Artist" />
                <h2 className="artist-details__name">{artistName}</h2>
                <p className="artist-details__description">Artist Description</p>
                <h3 className="artist-details__popular-songs">Popular Songs</h3>
                <div className="artist-details__songs">
                    {songs.map((song, index) => (
                        (<div key={index}>
                            <a href={`/song/${song.id}`} className="">{song.name} - {song.date} - #{song.topPlace}</a>
                        <br></br>
                        </div>)
                        // <div className="artist-details__song" key={index}>{song.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistDetailsPage;