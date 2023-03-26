 import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import * as postService from '../../services/postService';
import { PostContext } from "../../contexts/PostContext";

const Edit = () => {
    const [book, postState] = useState({});
    const { postEdit } = useContext(PostContext);
    const postId = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        postService.getDetails(postId.id)//vzimame konkretnata igra
            .then(result => {
                postState(result);
            })
    }, [postId.id])

    const onSubmit = (e) => { //pregledai HTMLA trqbva vsichko da e defaultVelue={...}
        e.preventDefault();

        const editData = Object.fromEntries(new FormData(e.target));//vzimame inputa
        //console.log(editData)

        if (editData.title === '' || editData.description === '' || editData.imageUrl === '' || editData.type === '') {
          return alert('Pleas, fill all fields!')
         }

        postService.editPost(postId.id, editData)
            .then(result => { //vkarva me v sarvara promqnata
                postEdit(postId.id, result); //davame go na postEdit() vav PostContext.js
                navigate(`/details/${postId.id}`)
            });
    };
//<select id="type" name="type" defaultValue={'DEFAULT'}> //vav HTMLA pravish tezi promeni za da se sachetaqt value sas dafaultValue(koito se promenqt)
//<option  value="DEFAULT" disabled>Fiction</option>

return(
<section id="edit-page" className="edit">
  <form id="edit-form" onSubmit={onSubmit}>
  <fieldset>
      <legend>Edit my Book</legend>
      <p className="field">
        <label htmlFor="title">Title</label>
        <span className="input">
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={book.title}
          />
        </span>
      </p>
      <p className="field">
        <label htmlFor="description">Description</label>
        <span className="input">
          <textarea
            name="description"
            id="description"
            defaultValue={book.description}
              
          />
        </span>
      </p>
      <p className="field">
        <label htmlFor="image">Image</label>
        <span className="input">
          <input
            type="text"
            name="imageUrl"
            id="image"
            defaultValue={book.imageUrl}
          />
        </span>
      </p>

      
      <p className="field">
        <label htmlFor="type">Type</label>
        <span className="input">
          <select id="type" name="type" defaultValue={'DEFAULT'}>
          <option  value="DEFAULT" disabled>Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Mistery">Mistery</option>
                <option value="Classic">Clasic</option>
                <option value="Other">Other</option>
          </select>
        </span>
      </p>
      
      <input className="button submit" type="submit" defaultValue="Save" />
    </fieldset>
    </form>
</section>
)
  }

export default Edit;



    