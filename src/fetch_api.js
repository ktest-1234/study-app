export async function handleRetrieveData(path){
    try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://solid-adventure-wvxxjxw5rxxf9594-8000.app.github.dev/${path}`)
            
            if (!response.ok) {
                // 1. Log the HTTP status code
                console.error(`An HTTP error occurred with code ${response.status}`);
                
                // 2. Log the HTML body text to see the exact server error page
                const errorText = await response.text();
                console.error("Server Error HTML:", errorText);
                return; // Stop execution here
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

export async function handlePostData(infoToSend, path){
    const postData = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(infoToSend),
    }
    try{
        const request = await fetch(`https://solid-adventure-wvxxjxw5rxxf9594-8000.app.github.dev/${path}`, postData);
        if (!request.ok){
            console.log('Error when doing POST request', request.status, request)
            return null
        }
        const data = await request.json()
        return data
    }
    catch(error){
        console.log(`An error occured: ${error}`);
        return null
    }
}