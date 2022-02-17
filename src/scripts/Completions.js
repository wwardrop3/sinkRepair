//return a list of completed jobs

import { getCompletions } from "./dataAccess.js"


export const Completions = () => {
    const completions = getCompletions()
    const listArray = completions.map(completion => {
        return`<li>
        ${completion.description}
        <button class = "completion__delete" id = completion--${completion.id}">Delete</button>
        </li>`
    })
    const listHtml = listArray.join("")
    html+= listHtml
    html += `</ul>`
    return html

}