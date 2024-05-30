import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchSongName from "../../components/SearchSongName/SearchSongName";

function SearchResultPage() {
    const [searchresults, setSearchResults] = useState([])
    const [query] = useState(new URLSearchParams(useLocation().search) || 'Search')
    const [nameQuery, setNameQuery] = useState(query.get('name'))
    const [artistQuery, setArtistQuery] = useState(query.get('artist'))
    const navigate = useNavigate()

    const generateSearchParams = (songName, baseUrl, artist, searchType) => {
        var url = baseUrl;
        if (songName) {
            url = url.concat(`name=${songName}`);
        }

        if (artist) {
            if (songName) {
                url = url.concat('&');
            }
            url = url.concat(`artist=${artist}`);
        }
        if (songName && artist && searchType) {
            if (searchType != 'AND' && searchType != 'OR') {
                throw new Error('Invalid search type');
            }
            url = url.concat(`&searchType=${searchType}`);
        }
        return url;
    }

    // searchType is generally 'AND' or 'OR'
    // I could pass the query through but I'm reconstructing it here for now
    const sendSearch = async (songName, artist, searchType = undefined) => {
        var url = '/api/search?'
        url = generateSearchParams(songName, url, artist, searchType);
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

    const onClickAnd = (searchType) => {
        debugger
        sendSearch(nameQuery, artistQuery, searchType).then((result) => {
            debugger
            const baseUrl = '/search?'
            // this is dangerous, there is potential race condition here
            navigate(generateSearchParams(nameQuery, baseUrl, artistQuery, searchType))
            setSearchResults(result)
        }).catch(err => {
            console.log(err)
        })
    }

    // I should only re-render the bottom half but can do a full page refresh for now
    // Do I want a separate artist results?
    const searchForm = () => {
        return (
            <div className="main_search_form">
                <div>
                    <form action="/search" method="get">
                        <input type="search" id="nameSearchField" name="name" placeholder="search song names"
                            onInput={e => setNameQuery(e.target.value)} defaultValue={nameQuery || ''} />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div>
                    <form action="/search" method="get">
                        <input type="search" id="artistSearchField" name="artist" placeholder="search songs by artist"
                            onChange={e => setArtistQuery(e.target.value)} defaultValue={artistQuery || ''} />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div>
                    <form>
                        <button type="button" onClick={e => onClickAnd(e.target.innerText)}>OR</button>
                        <button type="button" onClick={e => onClickAnd(e.target.innerText)}>AND</button>
                    </form>
                </div>
            </div>
        )
    }
    // I will need a separate artist search to search the artists themselves

    return (
        <div>{searchForm()}{showSongNames()}</div>
    )

}

export default SearchResultPage;
