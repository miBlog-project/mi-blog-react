import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const [value, setValue] = useState("");

  return (
    <div className="write-post">
      <div className="input">
        <input className="title" type="text" placeholder="Title" />
        <div className="file-input">
          <input className="file" type="file" name="file" id="file" />
          <label for="file">Choose an Image</label>
        </div>
        <div className="category">
          <label><b>Category : </b></label>
          <div className="radio">
            <input type="radio" name="category" value="art" id="art" />
            <label htmlFor="art">Art</label>
          </div>
          <div className="radio">
            <input type="radio" name="category" value="crypto" id="crypto" />
            <label htmlFor="crypto">Crypto</label>
          </div>
          <div className="radio">
            <input type="radio" name="category" value="technology" id="technology" />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="radio">
            <input type="radio" name="category" value="food" id="food" />
            <label htmlFor="food">Food</label>
          </div>
          <div className="radio">
            <input type="radio" name="category" value="other" id="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </div>
      <div className="editor-container">
        <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
      </div>
      <div className="edit">
        <button>Save Changes</button>
      </div>
    </div>
  );
}

export default Write;