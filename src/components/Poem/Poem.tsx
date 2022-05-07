import { useEffect, useRef, useState } from "react"
import { iPoem } from "../../typescript/interfaces/poem"
import { POEM_ENDPOINT } from "../../utilities/constants"
import { of, fromEvent, switchMap, catchError } from "rxjs"
import { fromFetch } from "rxjs/fetch"
import { PoemView } from "../../views/Poem/PoemView"

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
                    return of({ error: true, message: `Error ${response.status}` })
                }
            }),
            catchError((err) => {
                console.error(err)
                return of({ error: true, message: err.message })
            })
        )

        getPoem$.subscribe({
            next: (result) => setPoem(result?.[0]),
            complete: () => console.log("Request completed"),
        })

        const refreshPoem = fromEvent(buttonRef.current, "click")
            .pipe(switchMap(() => getPoem$))
            .subscribe((res: any) => res.then(setPoem(res?.[0])))

        return () => refreshPoem.unsubscribe()
    }, [])

    return (
        <PoemView
            title={title}
            author={author}
            linecount={linecount}
            lines={lines}
            buttonRef={buttonRef}
        />
    )
}
