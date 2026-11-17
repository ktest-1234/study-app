import { FaListCheck } from "react-icons/fa6";
import { handlePostRequest } from "./fetch_api";

export async function obtainNewTokens(email, password){
    try{
        const response = await handlePostRequest(
            {
                email: email,
                password: password,
            },'api/token/obtain/'
        );
        // if (!response?.ok){
        //     console.error('Error occured when trying to obtain new pair of tokens');
        //     return;
        // }
        console.log(response);
        return response;
    }
    catch(error){
        console.error(error);
    }
  }    

export async function refreshAccessToken(){
    try{
        const response = await handlePostRequest(
            {}, 'api/token/refresh/'
        );
        console.log(response);
        return response;
    }
    catch(error){
        console.error(error);
    }
}

export async function obtainOrRefreshTokens(email, password){

    const response = await refreshAccessToken();
    if (!!response){
        return null;
    } else {
        await obtainNewTokens(email, password);
    }
}

export async function checkAccessToken(setIsAuthenticated, setIsCheckingAuth){
    try{
        setIsCheckingAuth(true)
        const response = await handlePostRequest({}, 'api/token/verify/');

        console.log(response);

        if (!!response){
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        return response;
    }
    catch(error){
        console.error(error);
        setIsAuthenticated(false);
    }
    finally{
        setIsCheckingAuth(false);
    }
}