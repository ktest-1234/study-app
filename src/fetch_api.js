import { getCookie } from "./cookies";

const BASE_URL = 'http://127.0.0.1:8000'

export async function handleGetRequest(path){
    try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${BASE_URL}/${path}`)
            
            if (!response.ok) {
                // 1. Log the HTTP status code
                console.error(`An HTTP error occurred with code ${response.status}`);
                
                // 2. Log the HTML body text to see the exact server error page
                const errorText = await response.text();
                console.error("Server Error HTML:", errorText);
                return null; // Stop execution here
            }

            // This only runs if status code is 200-299
            console.log(`Status code ${response.status}`);
            const data = await response.json();
            return data
        }
    catch (error) {
        console.error(`An error occurred when fetching: ${error}`);
    }
};

export async function handlePostRequest(request, path){
    const postData = {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type':'application/json', 'X-CSRFToken':getCookie('csrftoken')},
        body: JSON.stringify(request),
    }
    try{
        const response = await fetch(`${BASE_URL}/${path}`, postData);
        if (!response.ok){
            console.error('Error when doing POST request', response.status, response)
            return null
        }
        const data = await response.json()
        return data
    }
    catch(error){
        console.error(`An error occured: ${error}`);
        return null
    }
}

export async function handleAuthenticatedPostRequest(token, path){
    const postData = {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({ key: 'value' }),
    }
    try{
        const response = await fetch(`${BASE_URL}/${path}`, postData);
        if (!response.ok){
            console.log('Error when doing POST request', response.status, response)
            return null
        }
        const data = await response.json()
        return data
    }
    catch(error){
        console.log(`An error occured: ${error}`);
        return null
    }
}