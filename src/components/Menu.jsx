import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultImage from '../images/miBlog-default-post-img.png';

const Menu = ({ cat }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setRelatedPosts(res.data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Explore Other Posts</h1>
      {relatedPosts.map(relatedPost => (
        <div className="post" key={relatedPost.id}>
          <Link className="link" to={`/post/${relatedPost.id}`}>
            {relatedPost.img ? (
            <img src={relatedPost.img} alt="related post pic" />
            ) : (
            <img src={defaultImage} alt="default related post pic" />
            )}
            <h3>{relatedPost.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Menu;