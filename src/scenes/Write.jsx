import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import moment from 'moment';

const Write = () => {
  const state = useLocation().state;

  const navigate = useNavigate();

  const [desc, setDesc] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [error, setError] = useState(null);

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      setError("Upload Failed");
    }
  }

  const handleUpdate = async e => {
    e.preventDefault();

    const imgUrl = await uploadFile();

    try {
      if (state) {
        await axios.put(`/posts/${state.id}`, {
          title,
          desc,
          cat,
          img: imgUrl,
        });

        navigate("/"); 
      } else {
        await axios.post("/posts/", {
          title,
          desc,
          cat,
          img: imgUrl,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });

        navigate("/");
      }
    } catch (err) {
      setError(`${err.response.status} : Failed to update`);
    }
  }

  useEffect(() => {
    setDesc(state?.desc || "");
    setTitle(state?.title || "");
    setCat(state?.cat || "");
  }, [state]);

  return (
    <div className="write-post">
      <div className="input">
        <input className="title" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <div className="file-input">
          <input className="file" type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])} />
          <label htmlFor="file">Choose an Image</label>
        </div>
        <div className="category">
          <label><b>Category : </b></label>
          <div className="radio">
            <input type="radio" name="category" value="art" checked={cat === "art"} id="art" onChange={e => setCat(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="radio">
            <input type="radio" name="category" value="crypto" checked={cat === "crypto"} id="crypto" onChange={e => setCat(e.target.value)} />
            <label htmlFor="crypto">Crypto</label>
          </div>
          <div className="radio">
            <input type="radio" name="category" value="technology" checked={cat === "technology"} id="technology" onChange={e => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="radio">
            <input type="radio" name="category" value="food" checked={cat === "food"} id="food" onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
          <div className="radio">
            <input type="radio" name="category" value="other" checked={cat === "other"} id="other" onChange={e => setCat(e.target.value)} />
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </div>
      <div className="editor-container">
        <ReactQuill className="editor" theme="snow" value={desc} onChange={setDesc} />
      </div>
      <div className="edit">
        <button onClick={handleUpdate}>Save Changes</button>
        {error && <p style={{color: "red"}}>{ error }</p>}
      </div>
    </div>
  );
}

export default Write;