import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = () => {
    
    const { posts } = useContext(PostContext);//vzimame postovete ot konteksta(PostContext)
    
    return (
        <section id="dashboard-page" className="dashboard">
        <h1>Catalog</h1>
        <ul className="other-books-list">
            {posts.length > 0
                ? posts.map(post => <CatalogItem key={post._id} post={post} />)
                : <p className="no-books">No posts in database!</p>
            }
        </ul>
        </section>
    );
};

export default Catalog;










