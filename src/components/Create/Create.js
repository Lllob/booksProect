import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';

import * as postService from '../../services/postService';

const Create = () => {
    const { postCreate } = useContext(PostContext);//ot Postkonteksta vzimame

    const onSubmit = (e) => {
        e.preventDefault();

        const postData = Object.fromEntries(new FormData(e.target));
           
             if (postData.title === '' || postData.description === '' || postData.imageUrl === '' || postData.type === '') {
              return alert('Pleas, fill all fields!')
             }

        postService.create(postData)//davame dannite na create (i vav postService.js na sarvara)
        .then(result => { //pri ok:
            postCreate(result)//vkarvame dannite vav postCreate (ot PostContext.js, i vav steita)
        });
    };



    return(
<section id="create-page" className="create">
      <form onSubmit={onSubmit} id="create-form" action="/create" method="POST">
        <fieldset>
          <legend>Create Post</legend>
          <p className="field">
            <label htmlFor="title">Title</label>
            <span className="input">
              <input type="text" name="title" id="title" placeholder="Title" />
            </span>
          </p>
          <p className="field">
            <label htmlFor="description">Description</label>
            <span className="input">
              <textarea
                name="description"
                id="description"
                placeholder="Description"
                defaultValue={""}
              />
            </span>
          </p>
          <p className="field">
            <label htmlFor="image">Image</label>
            <span className="input">
              <input type="text" name="imageUrl" id="image" placeholder="Image" />
            </span>
          </p>
          <p className="field">
            <label htmlFor="type">Type</label>
            <span className="input">
              <select id="type" name="type">
                <option value="Fiction">Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Mistery">Mistery</option>
                <option value="Classic">Clasic</option>
                <option value="Other">Other</option>
              </select>
            </span>
          </p>
          <input
            className="button submit"
            type="submit"
            defaultValue="Add Book"
          />
        </fieldset>
      </form>
    </section>
    )
};

export default Create;