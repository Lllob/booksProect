import { createContext, useReducer, useEffect } from "react";//sas createContext izpolzvame userReducer(vmesto useContext) dvoina dinamichna precizno hvaashtane na proverka
import { useNavigate } from 'react-router-dom';

import * as postService from '../services/postService';//fetcha za POST, GET

export const PostContext = createContext();//pravim kontext, i dolu v htmla vkarvame dannite

//spomagatelna funkciq za redusera
const postReducer = (state, action) => {//chrez reducera pravim promenite//dannite idvat ot dispatch
//vav state sa: starite postove, pravim dinamichnite promeni chrez action(novite danni idvat ot dispatch) - i ot tam vlizat vav state(no ne se zapazvat; action gi zapazva)
  //console.log(state)//vliza vsichko: cataloga, dobavqneto na kniga, trieneto(maha), detailsa(v sluchaq nishto ne se promenq)
    switch (action.type) {

        case 'CATALOG': 
            return action.data;

        case 'CREATE'://create
            return [...state, action.data];//starite postove(...state, + noviqt post)

         case 'DETAILS':
           return state.map(p => p._id === action.postId ? action.data : p);//starite postove, ako ima promqna vav konkretniqt post go zameni s novite danni, ako ne dobavi si stariqt
            
        case 'EDIT'://edit
            return state.map(p => p._id === action.postId ? action.data : p);//starite postove, ako ima promqna vav konkretnite postove gi dobavi, ako ne dobavi si starite

        case 'REMOVE'://delete
            return state.filter(p => p._id !== action.postId);

        default: //ako li ne:
            return state; //varni starite danni
    }

};

///
export const PostProvider = ({   //posle vliza vav App.js h
    children,      //celiqt html mejdu <postProvider>htmla</postProvider> ot App.js
}) => {
    const navigate = useNavigate();
    const [posts, dispatch] = useReducer(postReducer, []);//useReducer( e podobno na, useStata)// vav dispatch vkarvame dannite, i otivat v gornata funkciq 
    //vav posts sa vsichki danni(kakto gore vav state) // dispatch vzima novite danni i gi dava gore na action, kadeto stavat promenite// tazi i gornata funkciq sa varzani

     //cataloga
    useEffect(() => { //pravi se sas steita(inache hvarlq greshka)
        postService.getCatalog()//cataloga //vzimame dannite ot sarvara
            .then(result => { //pri ok:
                 const action = {   
                    type: 'CATALOG', 
                    data: result,    //data - vsichki postove
                };
                dispatch(action); //vkarvame vav dispatch dannite kato obekt//posle gore vav actiona e dispatcha
            });
    }, []);//da se izpalni samo vednash
    
    
    
    //za detailsa
    const tekushtPost = (postId) => { //vzimame tekushtata kniga (izpolzva me go vav Dtails.js)
        return posts.find(p => p._id === postId) || {}; //vav posts e slojen tekushtiqt katalog a sas dispatch slagame promenite, i gore oshte vednsh
    };
     

    //details (samo ako ima promeni, inache e ne se izpolzva)
    // const postDetails = (data, postId) => {
    //     const action = { 
    //         type: 'DETAILS', 
    //         data,
    //         postId,   
    //     };
    //     dispatch(action)
    // };
   
   //create
    const postCreate = (postData) => {//create //dannite idvat ot Create.js
        dispatch({
            type: 'CREATE',
            data: postData, //vkarvamr gi vav steita
        })
        //console.log(posts)
        navigate('/catalog');
    };
    


    //edit
    const postEdit = (postId, postData) => {//vzimame dannite ot Edit.js
        dispatch({
            type: 'EDIT',
            data: postData,
            postId,
        });
        
    };

    //delite
    const  postRemove = (postId) => {
        dispatch({
            type: 'REMOVE',
            postId,
        })
        //console.log(postId)
    }





    
   
    
    return (//vav App.js <postProvider> izliza dolnoto </postProvider>
        <PostContext.Provider value={{ //vkarvame vav contexta(GameContext) value={moje da se vika ot celiqt children}
            posts, 
            postCreate,
            postEdit,
            postRemove,
            //postDetails,
            tekushtPost,
        }}>
            {children}
        </PostContext.Provider>
    );
}

//////////////////////////////////////////////////////////////
/////////chres useState:
//import { useState} from '/react'

//definira se nai gore:
// const [state, setPost] = useState([]);//vav tozi steit vkarvame vsichki postove

// useEffect(() => {
//   postService.getCatalog()  //vzimame cataloga ot sarvara
//       .then(result => {
//           setPost(result);
//       });
// }, []); //samo vednash se izpalnqva

// const postCreate = (postData) => { //ot Create.js vzimame dannite
//   setPost(state => [
//       ...state, //starite postove
//       postData, //novata postove
//   ]);

//   navigate('/catalog'); //otidi v Catalog.js
// };

// const postEdit = (postId, postData) => {//dannite idvat ot Edit.js
//   setPost(state => state.map(p => p._id === postId ? postData : p));
// }
