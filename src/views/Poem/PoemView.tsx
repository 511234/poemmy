import { iPoemView } from "../../typescript/interfaces/poem"
import "./poem.sass"

export const PoemView = ({ title, author, linecount, lines, buttonRef }: iPoemView) => {
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
