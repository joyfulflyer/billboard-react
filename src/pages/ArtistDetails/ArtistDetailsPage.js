import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useQuery } from '../../components/hooks/useQuery';
import styles from "./artistDetailsPage.module.scss";

// There are currently no links to this page
const ArtistDetailsPage = () => {

    const [songs, setSongs] = useState([])
    const [artistName, setArtistName] = useState('')
    const query = useQuery('artist')

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                // this is currently _very_ slow
                const response = await axios.get(`/api/artist?artist=${query}`)
                setSongs(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchArtist()
    }, [])

    useEffect(() => {
        if (songs.length > 0) {
            setArtistName(songs[0].artist)
        }
    }, [songs])

    return (
        <div>
            <h1 className={styles["artist-details-header"]}>Artist Details</h1>
            <div className={styles["artist-details"]}>
                <img className={styles["artist-details__image"]} src="artist-image-url" alt="Artist" />
                <h2 className={styles["artist-details__name"]}>{artistName}</h2>
                <p className={styles["artist-details__description"]}>Artist Description</p>
                <h3 className={styles["artist-details__popular-songs"]}>Popular Songs</h3>
                <div className={styles["artist-details__songs"]}>
                    {songs.map((song, index) => (
                        (<div key={index}>
                            <a href={`/song/${song.id}`} className="">{song.name} - {song.date} - #{song.topPlace}</a>
                        <br></br>
                        </div>)
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistDetailsPage;
