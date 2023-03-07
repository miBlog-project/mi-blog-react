import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
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
      await axios.post("/users/", {
        image: imgUrl,
      });
      
      navigate("/");
    } catch (err) {
      setError(`${err.response.status} : Failed to update`);
    }
  }

  return (
    <div className="profile">
      {currentUser ? (
      <>
        <p style={{fontSize: "24px"}}>Welcome back {currentUser.username}</p>
        <p style={{fontSize: "16px", marginTop: "25px", color: "darkblue"}}>Upload a profile image here</p>
        <div className="file-input">
          <input className="file" type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])} />
          <label htmlFor="file">Choose an Image</label>
        </div>
        <button onClick={handleUpdate}>Save Changes</button>
        {error && <p style={{color: "red"}}>{ error }</p>}
      </>
      ) : (
      <p style={{fontSize: "20px", color: "darkblue"}}>Need to Login to view page</p>
      )}
    </div>
  );
}

export default Profile;