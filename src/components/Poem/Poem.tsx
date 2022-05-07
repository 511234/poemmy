import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { iPoem } from "../../typescript/interfaces/poem"
import { POEM_ENDPOINT } from "../../utilities/constants"
import "./poem.sass"
import { of, fromEvent, switchMap, catchError } from "rxjs"
import { fromFetch } from "rxjs/fetch"

export const Poem = () => {
    const poemInitialState = {
        title: "",
        author: "",
        linecount: "",
        lines: [""],
    }

    const buttonRef = useRef({} as HTMLButtonElement)
    const [poem, setPoem] = useState<iPoem>(poemInitialState)
    const { title, author, linecount, lines } = poem

    useEffect(() => {
        const getPoem$ = fromFetch(POEM_ENDPOINT).pipe(
            switchMap((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    // Server is returning a status requiring the client to try something else.
                    return of({ error: true, message: `Error ${response.status}` })
                }
            }),
            catchError((err) => {
                // Network or other error, handle appropriately
                console.error(err)
                return of({ error: true, message: err.message })
            })
        )

        const getPoem = () => {
            return getPoem$
        }

        getPoem$.subscribe({
            next: (result) => {
                console.log(result)
                setPoem(result?.[0])
            },
            complete: () => console.log("Request completed"),
        })

        const refreshPoem = fromEvent(buttonRef.current, "click")
            .pipe(switchMap(getPoem))
            .subscribe((res: any) => res.then(setPoem(res?.[0])))

        return () => refreshPoem.unsubscribe()

        // const getPoem = fromFetch(POEM_ENDPOINT).pipe(switchMap((response: any) => response.json()))

        // const observer = fromEvent(buttonRef.current, "click")
        //     .pipe(switchMap(getPoem))
        //     .subscribe((value) => console.log(value))
        // observer.unsubscribe()
    }, [])

    // const getPoem = async () => {
    //     const response = await axios.get(POEM_ENDPOINT)
    //     setPoem(response.data?.[0])
    // }

    return (
        <>
            <div className="poem-container">
                <div className="poem-information">
                    <div className="poem-title">{title} </div>
                    <div className="poem-author">{author} </div>
                </div>
                {lines.map((line, index) => {
                    return (
                        <div className="poem-line" key={index}>
                            {line}
                        </div>
                    )
                })}
            </div>
            <button ref={buttonRef} className="poem-regenerate-button">
                Get New Poem
            </button>
        </>
    )
}
