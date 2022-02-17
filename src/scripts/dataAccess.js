
//this is the current state of the database data imported from the json file

//create empty arrays for all the arrays in the json file

const mainContainer = document.querySelector("#container") //need to definine main container in every module it is called.  This also exists in main.js


const applicationState = {
    requests: [],
    plumbers: [],
    completions: [],

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

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
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
        )
    }



export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" }) //takes in an id value passed in by delete button from requests module, deletes the json object with that id
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged")) //statechanged custom event will be heard by the main module that will rerender the html once it is triggered.  
            //2 custom events can use the same "stateChanged" identifier
        }
    )
}

export const deleteCompletion = (id) => {
    return fetch(`${API}/completions/${id}`, { method: "DELETE" }) //takes in an id value passed in by delete button from requests module, deletes the json object with that id
    .then(
        () => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged")) //statechanged custom event will be heard by the main module that will rerender the html once it is triggered.  
            //2 custom events can use the same "stateChanged" identifier
        }
    )
}




export const fetchPlumbers = () => {
    //gets the requests array from the api folder

    return fetch(`${API}/plumbers`) //Why doesnt this have a second parameter like the fetch method at the bottom???

        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(
            //anonymous function
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.plumbers = serviceRequests
            }
        )
}

export const fetchCompletions = () => {
    //gets the requests array from the api folder

    return fetch(`${API}/completions`) //Why doesnt this have a second parameter like the fetch method at the bottom???

        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(
            //anonymous function
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.completions = serviceRequests
            }
        )
}

export const getCompletions = () => {
    const listArray = applicationState.completions.map = (completion => ({...completion}))
    return listArray
}


//finds request object that was clicked on to assign a plumber
export const setPlumber = (requestId, plumberId) => {
    const foundPlumber = applicationState.plumbers.find(plumber => {
        return plumber.id === plumberId
    })
    console.log(foundPlumber)
    let updatedRequest = ""
    for(const request of applicationState.requests){
        if(request.id === parseInt(requestId)){
            request.plumberId = parseInt(plumberId)
            request.plumberName = foundPlumber.name
            request.finishedBy = Date.now()
            request.completed = true
            
            updatedRequest = request
            //hide dropdown once it is selected

        }
    }
    return updatedRequest
    }

export const sendCompletedRequest = (updatedRequest) => {
    const fetchOptions = {
        //POST tells the API that you want to create something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedRequest)
    }
    document.dispatchEvent(new CustomEvent("completedRequestSaved"))
    return fetch(`${API}/completions`, fetchOptions)
    .then(response => response.json()) //Why doesnt this have a second parameter like the fetch method at the bottom???

    //.then() waits till the fetch is done before converting json data
    

}


export const updateRequestDatabase = (updatedRequest) => {
    const fetchOptions = {
        //POST tells the API that you want to create something new
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedRequest)
    }
    return fetch(`${API}/requests/${updatedRequest.id}`, fetchOptions) //Why doesnt this have a second parameter like the fetch method at the bottom???

        //.then() waits till the fetch is done before converting json data
        .then(response => response.json())
        .then(document.dispatchEvent(new CustomEvent("requestDatabaseUpdated"))
        )}