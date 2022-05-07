import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
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

    const buttonRef = useRef(null);
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
        <>
            <div className="poem-container">
                <div className="poem-information">
                    <div className="poem-title">{title} </div>
                    <div className="poem-author">{author} </div>
                </div>
                {lines.map((line) => {
                    return <div className="poem-line">{line}</div>
                })}
            </div>
            <button ref={buttonRef} onClick={getPoem} className="poem-regenerate-button">
                Get New Poem
            </button>
        </>
    )
}
