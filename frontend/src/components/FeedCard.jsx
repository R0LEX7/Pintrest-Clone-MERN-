import React from 'react'
import "../stylesheets/feed.css";


const FeedCard = ({props}) => {
  return (
    <div className="gallery-item">
    <figure>
      <img
        src= {props?.image}
        alt="dog"
      />
      <figcaption>
        {props?.userId?.username}
      </figcaption>
    </figure>
    <p>{props?.postText}</p>
  </div>
  )
}

export default FeedCard