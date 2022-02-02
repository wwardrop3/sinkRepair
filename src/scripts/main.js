import { fetchRequests, getRequests } from "./dataAccess.js"
import { Requests } from "./Requests.js"
import { SinkRepair } from "./SinkRepair.js"

const requests = getRequests()
const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

