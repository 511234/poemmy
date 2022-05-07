import axios from "axios"
import React, { useEffect, useState } from "react"
import { iPoem } from "../../typescript/interfaces/poem"
import { POEM_ENDPOINT } from "../../utilities/constants"
import "./poem.sass"

export const Poem = () => {
    const poemInitialState = {
        title: "",
        author: "",
        linecount: "",
        lines: [""],
    }
    const [poem, setPoem] = useState<iPoem>(poemInitialState)
    const { title, author, linecount, lines } = poem

    useEffect(() => {
        getPoem()
    }, [])

    const getPoem = async () => {
        const response = await axios.get(POEM_ENDPOINT)
        setPoem(response.data?.[0])
    }

    return (
        <div className="poem-container">
            <div>Title: {title} </div>
            <div>Author: {author} </div>
            <div>Lines: {lines} </div>
        </div>
    )
}
