import { deleteCompletion, deleteRequest, fetchRequests, getPlumbers, getRequests, sendCompletedRequest, setPlumber, updateRequestDatabase } from "./dataAccess.js"






//function returns an html list of service requests
export const Requests = () => {
    const requests = getRequests()
    const sortedRequests1 = requests.sort((a,b) => b.finishedBy > a.finishedBy)
    const sortedRequests2 = requests.sort((a,b)=> a.completed - b.completed)
    let html = `<ul>`
    const listArray = sortedRequests2.map(request => {
        return`<li style = "background-color:${checkStatus(request, sortedRequests2)}">
        ${request.description}
        ${checkCompleted(parseInt(request.id))}
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
            deleteCompletion(parseInt(requestId))//also delete from the completion database    
    }
    }
    )

const checkCompleted = (requestId) => {

    const requests = getRequests()
    const foundRequest = requests.find(request => {
        return request.id === requestId
    })
    if(foundRequest.completed === true){
        return `${foundRequest.plumberName}`
    } else {
        return `<select name = "plumberSelected" id = "idOfRequest--${requestId}">
        <option value = "0">Select Plumber</option>
        <option value = "1">Maude</option>
        <option value = "2">Merle</option>
    </select>`
    }
    

}
    
const checkStatus = (requestObject, sortedRequests2) => {

    if(requestObject.completed === true){
        return "lightgray"
    } else {
        if(sortedRequests2.findIndex(x => x.id === requestObject.id) % 2 == 0){
            return "white"
        } else{
            return "lightblue"
        }
    }
}
