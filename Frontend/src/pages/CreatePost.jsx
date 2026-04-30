import React from 'react'

const CreatePost = () => {
  return (
    <section className='create-post-section'>
      
      <form className="post-form">
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