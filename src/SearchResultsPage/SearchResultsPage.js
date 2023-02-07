import { useLocation } from "@reach/router";
import React from "react";

function SearchResultPage() {

    const query = new URLSearchParams(useLocation().search) || 'Search'

    console.log(query)
    return(
        <div>{query['artist']}</div>
    )

}

export default SearchResultPage;