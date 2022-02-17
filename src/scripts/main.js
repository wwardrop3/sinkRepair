import { fetchCompletions, fetchPlumbers, fetchRequests, getRequests, sendCompletedRequest, setPlumber, updateRequestDatabase } from "./dataAccess.js"
import { Requests } from "./Requests.js"
import { SinkRepair } from "./SinkRepair.js"

const requests = getRequests()
const mainContainer = document.querySelector("#container")


//renders page
const render = () => {
    fetchPlumbers()
    fetchRequests()
    fetchCompletions().then(
        () => {
            mainContainer.innerHTML = SinkRepair() //the main container html will result in the output of the sink repair function
        }
    )
}

render()


//rerenders page once the purchase button has been selected
mainContainer.addEventListener(
    "stateChanged", //just like "click" (which is a system event type), which we manually defined in the dataAccess module
    (customeEvent) => {
        render()
    }
)



//a job will be sent as completed once the plumber is selected
//once selected, a plumber will first be added to the transient request object with the id of whatever request was assigned a plumber
//then transient request object with plumber added is sent to completions
document.addEventListener(
    "change",
    (changeEvent) => {
        if(changeEvent.target.id.startsWith("idOfRequest")){
            const requests = getRequests()
            const [,requestId] = changeEvent.target.id.split("--")


            //return requests again after sending in requestId and plumberId
            const updatedRequest = setPlumber(requestId, changeEvent.target.value)
            
            updateRequestDatabase(updatedRequest)
            sendCompletedRequest(updatedRequest)
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }})


