import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import defaultImage from '../images/miBlog-default-post-img.png';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const cat = useLocation().search;

  const getText = (htmlTest) =>{
    const doc = new DOMParser().parseFromString(htmlTest, "text/html");
    return doc.body.textContent;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [cat]);

  return (
    <div className="home">
      <div className="posts">
        {error && <p style={{textAlign: "center"}}>{error}</p>}
        {posts.map(post => (
          <div className="post" key={post.id}>
            <div className="img">
              <Link className="link" to={`/post/${post.id}`}>
                {post.img ? (
                <img src={`http://localhost:8000/uploads/${post.img}`} alt="post pic" />
                ) : (
                <img src={defaultImage} alt="default post pic" />
                )}
              </Link>
            </div>
            <div className="content">
              <p><b>{post.author}</b></p>
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <p>{post.cateogry}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;