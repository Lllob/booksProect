import { useState, useEffect } from "react";
import { useAuthContext } from '../../contexts/AuthContext'
import * as postService from '../../services/postService';//fetcha za POST, GET

import MyListList from "./MyListList/MyListList";

const MyList = () => {
    const [mybook, setMyBooks] = useState([])
    const { user } = useAuthContext();
  
    useEffect(() => {
    postService.getMyBooks(user._id)//cataloga //vzimame dannite ot sarvara
      .then(result => { //pri ok:
         setMyBooks(result)
        })
    }, [user._id])
  

     return (
        <section id="dashboard-page" className="dashboard">
        <h1>Catalog</h1>
        <ul className="other-books-list">
            {mybook.length > 0
                ? mybook.map(post => <MyListList key={post._id} post={post} />)
                : <p className="no-books">No posts in your list!</p>
            }
        </ul>
        </section>
    );
 };

 export default MyList;