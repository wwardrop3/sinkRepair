
//this is the current state of the database data imported from the json file

//create empty arrays for all the arrays in the json file

const mainContainer = document.querySelector("#container") //need to definine main container in every module it is called.  This also exists in main.js

const applicationState = {
    requests: [],
    plumbers: [],
    completions: []

}

//navigate to the api directory in terminal before hosting the json server
const API = "http://localhost:8088"

//this function gets the data from the json file and converts it to js object data
export const fetchRequests = () => {
    //gets the requests array from the api folder

    return fetch(`${API}/requests`) //Why doesnt this have a second parameter like the fetch method at the bottom???

        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(
            //anonymous function
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
                console.log(applicationState)
            }
        )
}

//return an array of the current state of request data that is stored in the application
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

//sending a service request to the permenant JSON data file by defin
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        //POST tells the API that you want to create something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

//function sends
    return fetch(`${API}/requests`, fetchOptions) //fetch options is defined above with the POST method.
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged")) //This will create a "stateChanged" (just like a "click") event...Program will listen for when this happens
    }
    )}



