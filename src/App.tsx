import { fromEvent, scan, switchMap, throttleTime } from "rxjs"
import { fromFetch } from "rxjs/fetch"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import "./App.css"
import axios from "axios"
import { Poem } from "./components/Poem/Poem"

const POEM_ENDPOINT = "https://poetrydb.org/random"
const poemInitialState = {
    title: "",
    author: "",
    linecount: "",
    lines: [""],
}

export interface iPoem {
    title: string
    author: string
    linecount: string
    lines: Array<string>
}

function App() {
    const [poem, setPoem] = useState<iPoem>(poemInitialState)

    const getPoem = async () => {
        const response = await axios.get(POEM_ENDPOINT)
        setPoem(response.data?.[0])
        console.log(response)
        console.log(response.data[0])
    }

    const buttonRef = useRef({} as HTMLButtonElement)
    const lu = useEffect(() => {
        // const start = fromEvent(buttonRef.current, 'click').subscribe(() => console.log('Clicked!'));
        // const calculator = fromEvent(buttonRef.current, 'click').pipe(throttleTime(1000),scan((count) => count + 1, 0)).subscribe( (count) => console.log(count))
        getPoem()
        return () => {
            // start.unsubscribe();
            // calculator.unsubscribe();
        }
    }, [])

    const { title, author, linecount, lines } = poem

    return (
        <div className="App">
            <header className="App-header">
                <Poem />
                <div>Title: {title} </div>
                <div>Author: {author} </div>
                <div>Linecount: {linecount} </div>
                <div>Lines: {lines} </div>

                <button ref={buttonRef} onClick={() => console.log("hi")} type="button">
                    Get New Poem
                </button>
            </header>
        </div>
    )
}

export default App
