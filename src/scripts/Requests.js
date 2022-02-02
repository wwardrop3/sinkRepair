import { getRequests } from "./dataAccess.js"






//function returns an html list of service requests
export const Requests = () => {
    const requests = getRequests()
    let html = `<ul>`
    const listArray = requests.map(request => {
        console.log("asdf")
        return`<li>${request.description}</li>`
    })
    const listHtml = listArray.join("")
    html+= listHtml
    html += `</ul>`
    return html

}