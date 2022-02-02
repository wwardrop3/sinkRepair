import { getRequests } from "./dataAccess.js"


const requests = getRequests()
//function returns an html list of service requests
export const Requests = () => {
    let html = `<ul>`
    const listArray = requests.map(request => {
        return`<li>${request.description}</li>`
    })
    const listHtml = listArray.join("")
    html+= listHtml
    html += `</ul>`
    return html

}