export interface iPoem {
    title: string
    author: string
    linecount: string
    lines: Array<string>
}

export interface iPoemView{
    title: string
    author: string
    linecount?: string
    lines: Array<string>
    buttonRef: React.MutableRefObject<HTMLButtonElement>
}