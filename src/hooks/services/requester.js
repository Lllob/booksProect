

const request = async (method, url, data) => { //logikata// vkarvame dannite ot authServis.js,..

    try {
        const user = localStorage.getItem('auth'); //vzimame usera ot localStoriga
        const auth = JSON.parse(user || '{}');

        let headers = {}

        if (auth.accessToken) {//ako trqbva otorizaciq
            headers['X-Authorization'] = auth.accessToken;
        }

        let fetchData;

        if (method === 'GET') { //GET
            fetchData = fetch(url, { headers });
        } else {
            fetchData = fetch(url, {
                method,//POST// PUT//DELL
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        const response = await fetchData;//tuka go aweitvame

        if (!response.ok) { 
            const error = await response.json();
            throw new Error(error.message);
        }
       
        const result = await response.json();//vzimame dannite
        return result;
      
    } catch (error) {
        alert(error.message);
        throw error;
    }
};

export const get = request.bind({}, 'GET');//vzima logikata ot gore + GET i q izpalnqvame vav AuthServise.js,...
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
