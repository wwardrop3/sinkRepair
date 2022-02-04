import { fetchRequests, getRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

const requests = getRequests()
const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair() //the main container html will result in the output of the sink repair function
        }
    )
}

render()


mainContainer.addEventListener(
    "stateChanged", //just like "click" (which is a system event type), which we manually defined in the dataAccess module
    (customeEvent) => {
        render()
    }
)

