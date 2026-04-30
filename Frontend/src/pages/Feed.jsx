import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Feed = () => {

  const [posts, setPosts] = useState([
    {
      _id: 1,
      image: "https://images.unsplash.com/photo-1628827720737-d8ad84806c35?q=80&w=464&auto=format&fit=crop",
      caption: "Beautiful sunset at the beach!"
    }
  ])

//    here we connect backend using axious and fetch the posts from database and set it to state and then we map through the posts and display them in feed section

  useEffect(() => {

axios.get("http://localhost:3000/posts")
.then(res => {
    setPosts(res.data.posts)
  
})

  }, [])


  return (
    <section className='feed-section'>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id} className="post-card">
            
            <img 
              src={post.image} 
              alt={post.caption} 
              className="post-image" 
            />

            <div className="post-body">
              <p className="post-caption">{post.caption}</p>
            </div>

          </div>
        ))
      ) : (
        <p className="no-posts">No posts available.</p>
      )}
    </section>
  )
}

export default Feed