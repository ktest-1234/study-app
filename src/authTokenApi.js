import { handlePostRequest } from "./fetch_api";

export async function obtainNewTokens(email, password, setTokens){
    try{
        const response = await handlePostRequest(
            {
                email: email,
                password: password,
            },'api/token/obtain/'
        );
        if (!response?.ok){
            console.error('Error occured when trying to obtain new pair of tokens');
            return;
        }
        setTokens({
            accessToken: response.tokens.access,
            refreshToken: response.tokens.refresh,
        });
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
        if (!response?.ok){
            console.error('Invalid refresh token');
            return;
        }
        setTokens({
            accessToken: response.tokens.access,
        })
    }
    catch(error){
        console.error(error)
    }
  }   

export async function checkAccessToken(accessToken, setIsAuthenticated, setIsCheckingAuth){
    try{
        if (!accessToken){
            setIsAuthenticated(false);
            return;
        }
        const response = await handlePostRequest({
          token: accessToken, 
        }, 'api/token/verify/');

        if (!response?.ok){
            console.error('Access token has expired');
            setIsAuthenticated(false);
            return;
        }
        setIsAuthenticated(true);
    }
    catch(error){
        console.error(error);
        setIsAuthenticated(false);
    }
    finally{
        setIsCheckingAuth(false);
    }
}