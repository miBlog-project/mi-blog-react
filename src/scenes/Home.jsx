import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const cat = useLocation().search;

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
                <img src={post.img} alt="post pic" />
              </Link>
            </div>
            <div className="content">
              <p><b>{post.author}</b></p>
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.desc}</p>
              <p>{post.cateogry}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;