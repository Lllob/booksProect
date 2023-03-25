import {  useContext, useEffect, useState } from 'react';//useEffect,
import { PostContext } from '../../contexts/PostContext';

import {  useParams, Link, useNavigate } from 'react-router-dom'; //za ID, link, navigate(/catalog)
import { useAuthContext } from '../../contexts/AuthContext';//vzimame dannite za usera

import * as postService from '../../services/postService';

 
const Details = () => {
  //const [detail, setDetail] = useState()
    let  [count, setCount] = useState(0)  //za like 
     let  [like, setLiks] = useState(false);
    let  [buy, setBuy] = useState(false)//buys
    
    const postId = useParams();//kato obect {id:223533}
    const { postRemove, tekushtPost } = useContext(PostContext); // postDetails, 
    const { user } = useAuthContext();
    const navigate = useNavigate();
  
    //details
    useEffect(() => {
    postService.getDetails(postId.id)
    .then(result => {
     //setDetails(result)
    })
   },[postId.id]) 
     //console.log(detail)
      const currentPost = tekushtPost(postId.id);//vzimame tekushtata knig ot kataloga
      const isOwner = currentPost._ownerId === user._id; //sobstvenika na posta
  
       
    /////Delita
    const postDeleteHandler = () => {//pri natiskane na butona dellite se izpalnqva funkciqta
      const confirmation = window.confirm('Are you sure you want to delete this book?');

      if (confirmation) {
          postService.remove(postId.id)//iztrivame vav sarvara
              .then(() => { //pri ok
                  postRemove(postId.id); //iztrivame vav steita //ot PostContext.js
                  navigate('/catalog');
              })
      }
     }

      
    
     //liks
     const increaseHandler = () => { 
        setCount(oldCount => oldCount + 1)
        setLiks((oldLike) => oldLike = true);
     }
     
    //disliks
    const decreaseHandler = () => {
        setCount(oldCount => oldCount - 1)
        setLiks((oldLike) => oldLike = false);
    };

/////////buy
    const buyHandler = () => {
       setBuy((oldBuy) => oldBuy = true)
       return alert('You have buy it')
    }


    

    return(
        <section id="details-page" className="details">
         
        <div className="book-information">
       
          <h3>{currentPost.title}</h3>
          <p className="type">Type: Fiction</p>
          <p className="img">
            <img src={currentPost.imageUrl} alt="images" />
          </p>
          <div className="actions">
            {/* Edit/Delete buttons ( Only for creator of this book ) */}
            {isOwner &&
            <div>
            <Link className="button" to={`/edit/${currentPost._id}`}>
              Edit  
            </Link>
            <button className="button" onClick={postDeleteHandler}>
              Delete
              </button>*
            </div>
            }
           
           {!isOwner &&
           <div>
            {!buy
            ? <button className="button" onClick={buyHandler}>Buy</button>
            : ''}
            </div>
            }


            <div className="likes">
              <img className="hearts" src="/images/heart.png" alt="images" />
              
              <span id="total-likes" >Liks {count}</span>
                {!isOwner &&
                <div>
                 {!like 
                  ? <button onClick={increaseHandler}>Like</button> 
                  : <button onClick={decreaseHandler}>Dislike</button>
                 }
              </div>
            }
              
            </div>
        
          </div>
        </div>
        <div className="book-description">
          <h3>Description:</h3>
          <p>
           {currentPost.description}
          </p>
        </div>
        
      </section>
    )
}

export default Details;