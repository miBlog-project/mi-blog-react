import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import logo from '../images/miBlog-default-user-logo.png';
import DOMPurify from "dompurify";

const Post = () => {
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const postId = location.pathname.split("/")[2];

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      setDeleteError(`${err.response.status} : Failed to delete`);
    }
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
              <img src={`http://localhost:8000/uploads/${post.image}`} alt="user pic" />
              ) : (
              <img src={logo} alt="default user pic" />
              )}
              <span><b>・ {post.username} ・</b></span>
              <p>Updated {moment(post.data).format("L")}</p>
            </div>
            {currentUser.username === post.username && (
            <div className="edit">
              <Link className="link" to={`/write?edit=${post.id}`} state={post} >
                <span>Edit</span>
              </Link>
              <span onClick={handleDelete}>Delete</span>
              {deleteError && <p style={{color: "red"}}>{ deleteError }</p>}
            </div>
            )}
            {post.img && <img src={`http://localhost:8000/uploads/${post.img}`} alt="post pic" />}
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></p>
          </>
        )}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
}

export default Post;