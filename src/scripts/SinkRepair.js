//Convert each service request object into HTML representations. Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

import { Requests } from "./Requests.js"


export const SinkRepair = () => {
    return `
    <h1>Maude and Merle's Sink Repair</h1>
    <section class="serviceForm">
    </section>


    <section class="serviceRequests">
        <h2>Service Requests</h2>
        ${Requests()}
    </section>
    `
}

