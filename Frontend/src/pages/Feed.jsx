import React, { useState } from 'react'

const Feed = () => {

  const [posts] = useState([
    {
      _id: 1,
      image: "https://images.unsplash.com/photo-1628827720737-d8ad84806c35?q=80&w=464&auto=format&fit=crop",
      caption: "Beautiful sunset at the beach!"
    }
  ])

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