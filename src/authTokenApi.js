import { FaListCheck } from "react-icons/fa6";
import { handlePostRequest } from "./fetch_api";

export async function obtainNewTokens(email, password, setTokens){
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
        if (!!response){
            setTokens({
                accessToken: response.access,
                refreshToken: response.refresh,
            });
        }
        return response;
    }
    catch(error){
        console.error(error);
    }
  }    

export async function refreshAccessToken(refreshToken, setTokens){
    try{
        const response = await handlePostRequest(
            {refresh: refreshToken}, 'api/token/refresh/'
        );
        console.log(response);
        if (!!response){
            setTokens({
                accessToken: response.access,
            });
        }
        return response;
    }
    catch(error){
        console.error(error);
    }
}

export async function obtainOrRefreshTokens(refreshToken, email, password, setTokens){

    const response = await refreshAccessToken(refreshToken, setTokens);
    if (!!response){
        return null;
    } else {
        await obtainNewTokens(email, password, setTokens);
    }
}

export async function checkAccessToken(accessToken, setIsAuthenticated, setIsCheckingAuth){
    try{
        setIsCheckingAuth(true)
        if (!accessToken){
            setIsAuthenticated(false);
            console.log('test');
            return;
        }
        const response = await handlePostRequest({
          token: accessToken, 
        }, 'api/token/verify/');

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