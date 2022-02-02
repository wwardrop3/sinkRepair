
//this is the current state of the database data imported from the json file

//create empty arrays for all the arrays in the json file
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
    return fetch(`${API}/requests`)
        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(
            //anonymous function
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

const test1 = fetchRequests()
const test = getRequests()
console.log(test)


