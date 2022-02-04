import { deleteRequest, getRequests } from "./dataAccess.js"






//function returns an html list of service requests
export const Requests = () => {
    const requests = getRequests()
    let html = `<ul>`
    const listArray = requests.map(request => {
        return`<li>
        ${request.description}
        <button class = "request__delete" id = request--${request.id}">Delete</button>
        </li>`
    })
    const listHtml = listArray.join("")
    html+= listHtml
    html += `</ul>`
    return html

}

const mainContainer = document.querySelector("#container")
mainContainer.addEventListener( //event listener is only listening within the container element
    "click",
    (clickEvent) => {
        if(clickEvent.target.id.startsWith("request")){
            const [,requestId] = clickEvent.target.id.split("--")
            deleteRequest(parseInt(requestId)) //delete request was imported from the dataAccess module where we definined the fetch call to remove the json object with the id that is passed in
                
    }
    }
    )