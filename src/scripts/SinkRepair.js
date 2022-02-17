//Convert each service request object into HTML representations. Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

import { Requests } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"

export const SinkRepair = () => {
    return `
    <h1>Maude and Merle's Sink Repair</h1>
    <section class="serviceForm">
        ${ServiceForm()}
    </section>


    <section class="serviceRequests">
        <h2>Service Requests</h2>
        ${Requests()}
    </section>
    `
}

document.addEventListener(
    "requestDeleted",
    (customEvent)=>{
        const htmlTarget = document.querySelector(".serviceRequests").innerHTML = 
        `<h2>Service Requests</h2>
        ${Requests}`
    }

)