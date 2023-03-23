import * as request from "./requester";//request.get, post, put, dell

const baseUrl = 'http://localhost:3030/users';

export const login = (email, password) => //dannite idva ot Login.js
    request.post(`${baseUrl}/login`, { email, password });//vkarvame dannite vav post(requester.js)


  /// 
export const register = (email, password) =>//dannite idvat ot Register.js
    request.post(`${baseUrl}/register`, {email, password});


export const logout = async (accessToken) => {//dannite idvat ot Logout.js
    //request.del(`${baseUrl}/logout`, {accessToken}); //dava greshka za tova:
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            },
        })
        if (!response.ok) { //hvashteme greshkata
            const error = await response.json()
            throw new Error(error.message);
        }

        return response;
    } catch (error) {
        alert(error.message);
        throw error;
    }
};


