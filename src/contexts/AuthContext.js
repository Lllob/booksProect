import { createContext, useContext } from "react";//izpolzvame useContext (konteksta)
import { useLocalStorage } from "../hooks/useLocalStorage"; //tam vkarvame dannite za usera vav localStorije

export const AuthContext = createContext();//auth konteksta

export const AuthProvider = ({//vikame go v App.js, za da sa dostapni dannite na vsqkade
    children,  //zeliqt html mejdu <AuthProvider>htmla</AuthProvider> vav App.js
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});//obiknoven steit(podobno na useState) //vkarvat se dannite vav useLocalStorage (ot useLocalStorige.js)
     //auth(dannite za usera) - izpolzva me go dolu vav htmla

    const userLogin = (authData) => {//informaciqta idva ot Login.js//dolu v htmla userLogin() q pravim dostapna na vsqkad
        setAuth(authData);//vkarvame vav setAuth() dannite za usera, i prvi prmenite i gi vkarva vav auth(steita) //useLocalStorage('auth', _id:..., 'name:Pesho,....)
    };

    const userLogout = () => {
        setAuth({});//izprazva me setAuth(), toest ot stranicata
            //localStorage.clear()
          
        
    };

    return ( //tova vmesto da go pravime vav App.js, go pravime tuka
    //sas AuthContext.Provider vkarvame contexta i value={e dostapno na vsqkade}
        <AuthContext.Provider value={{ 
            user: auth,
            userLogin,
            userLogout,
            isAuthenticated: !!auth.accessToken
        }}>
            {children}  {/*vkarvame i celiqt html (ot App.js koito e mejdu <AuthProvider>...</> */}
        </AuthContext.Provider>  
    );
};

// vmesto da pishem  na vsqkade// vkarvame konteksta za usera vav useAuthContext
export const useAuthContext = () => { //otiva vav PrivetRoute.js//Header.js
    const context = useContext(AuthContext);////vav contexta celiqt context, toest: (velue=....)

    return context;
};

 

