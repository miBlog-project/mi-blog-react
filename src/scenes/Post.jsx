import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import logo from '../images/miBlog-default-user-logo.png';

const Post = () => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);

  const location = useLocation();

  const { currentUser } = useContext(AuthContext);

  const postId = location.pathname.split("/")[2];

  const handleDelete = async () => {
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [postId]);

  return (
    <div className="single-post">
      <div className="content">
        {error ? (
          <p style={{textAlign: "center"}}>{error}</p>
          ) : (
          <>
            <h1>{post.title}</h1>
            <div className="user">
              {post.image ? (
              <img src={post.image} alt="user pic" />
              ) : (
              <img src={logo} alt="default user pic" />
              )}
              <span><b>・ {post.username} ・</b></span>
              <p>Updated {moment(post.data).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
            <div className="edit">
              <Link className="link" to={`/write?edit=2`}>
                <span>Edit</span>
              </Link>
              <span onClick={handleDelete}>Delete</span>
            </div>
            )}
            <img src={post?.img} alt="post pic" />
            {post.desc}
          </>
        )}
      </div>
      <Menu />
    </div>
  );
}

export default Post;