import React from 'react'
import axios from 'axios'
import{useNavigate} from 'react-router-dom'


const CreatePost = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting...");

  const formData = new FormData(e.target);

  try {
    const res = await axios.post("http://localhost:3000/create-post", formData);
    console.log("Success:", res);

    navigate('/feed');

  } catch (err) {
    console.error("API Error:", err);
  }
};


  return (
    <section className='create-post-section'>
      
      <form onSubmit={handleSubmit} className="post-form">
        <h1 className="form-title">Create Post</h1>

        <label className="file-upload">
          <input type="file" name="image" accept="image/*" />
          <span>📷 Upload Image</span>
        </label>

        <input 
          type="text" 
          name="caption" 
          placeholder="Enter caption..." 
          required 
        />

        <button type="submit">🚀 Submit</button>
      </form>

    </section>
  )
}

export default CreatePost