import { useLocation } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchSongName from "../../SearchSongName/SearchSongName";

function SearchResultPage() {

    const [searchresults, setSearchResults] = useState([])
    const [query] = useState(new URLSearchParams(useLocation().search) || 'Search')

    const sendSearch = async (songName, artist) => {
        var url = '/api/search?'
        if (songName) {
            url = url.concat(`name=${songName}`)
        }

        if (artist) {
            if (songName) {
                url = url.concat('&')
            }
            url = url.concat(`artist=${artist}`)
        }
        try {
            const result = await axios.get(url)
            return (result.data)
        } catch (e) {
            console.log(e)
            return e
        }
    }

    useEffect(() => {
        sendSearch(query.get('name'), query.get('artist')).then((result) => {
            setSearchResults(result)
        }).catch(err => {
            console.log(err)
        })
    }, [query])

    const showSongNames = () => {
        if (Array.isArray(searchresults) && searchresults.length > 0) {
            return (<div>{searchresults.map(res => {
                return (<SearchSongName key={res.id} song={res} />)
            })}</div>)
        }
    }

    return (
        <div>{showSongNames()}</div>
    )
}

export default SearchResultPage;
