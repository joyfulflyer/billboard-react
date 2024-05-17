import { useLocation } from "@reach/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchSongName from "../../SearchSongName/SearchSongName";

function SearchResultPage() {

    const [searchresults, setSearchResults] = useState([])
    const [query] = useState(new URLSearchParams(useLocation().search) || 'Search')
    const [nameQuery, setNameQuery] = useState(query.get('name'))
    const [artistQuery, setArtistQuery] = useState(query.get('artist'))

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

    const onClickAnd = () => {
        // TODO
    }

    const onClickOr = () => {
        // TODO
    }

    // I should only re-render the bottom half but can do a full page refresh for now
    const searchForm = () => {
        return (
            <div className="main_search_form">
                <div>
                <form action="/search" method="get">
                    <input type="search" id="nameSearchField" name="name" placeholder="search song names" onInput={e => setNameQuery(e.target.value)} defaultValue={nameQuery || ''} />
                    <button type="submit">Search</button>
                </form>
                </div>
                <div>
                <form action="/search" method="get">
                        <input type="search" id="artistSearchField" name="artist" placeholder="search artists" onChange={e => setArtistQuery(e.target.value)} defaultValue={artistQuery|| ''}/>
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div>
                    <form>
                        <button type="submit" onClick={e => onClickOr(e.target.value)}>OR</button>
                        <button type="submit" onClick={e => onClickAnd(e.target.value)}>AND</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div>{searchForm()}{showSongNames()}</div>
    )
}

export default SearchResultPage;
