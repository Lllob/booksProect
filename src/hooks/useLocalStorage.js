import { useState } from 'react';
                              //('user', {} )
export const useLocalStorage = (key, defaultValue) => {//key = 'auth' //defaultvelue = dannite
    
    const [value, setData] = useState(() => {
    //vzimame dannite za usera ot localstorig
        const storijData = localStorage.getItem(key);//vzimame ot localStoraga key('user') dannite za usera
        //console.log(storijData) cqlata informaciq za usera
        return storijData ? JSON.parse(storijData) : defaultValue;//sas .parse  preobrazuvame dannite
    });                  //ako ima danni vav localStor.,: ako ne ot defaultveluto(informacita se palni vav authContexta)
       
    const setLocalStorageValue = (storData) => { //vkarvame vav localStorage novoto velue
        localStorage.setItem(key, JSON.stringify(storData));//vav localStorij vkarvame newValue
        setData(storData);//vkarvame vav setValue (newValue)
    };

   
    //moje da izpolzvame vav drugite papki
    return [
        value,
        setLocalStorageValue,
    ];
}
