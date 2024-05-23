import React from 'react';
import { doc, updateDoc } from "firebase/firestore";

const VideoList = ({ videos, db }) => {

  const handleVote = async (videoId, voteType) => {
    const videoRef = doc(db, "videos", videoId);
    const videoDoc = videos.find(video => video.id === videoId);

    let updatedLikes = videoDoc.likes;
    let updatedDislikes = videoDoc.dislikes;

    const userId = "currentUser"; 

    if (voteType === 'like') {
      if (updatedLikes.includes(userId)) {
        updatedLikes = updatedLikes.filter(id => id !== userId);
      } else {
        updatedLikes.push(userId);
        updatedDislikes = updatedDislikes.filter(id => id !== userId);
      }
    } else {
      if (updatedDislikes.includes(userId)) {
        updatedDislikes = updatedDislikes.filter(id => id !== userId);
      } else {
        updatedDislikes.push(userId);
        updatedLikes = updatedLikes.filter(id => id !== userId);
      }
    }

    await updateDoc(videoRef, {
      likes: updatedLikes,
      dislikes: updatedDislikes
    });
  };

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id} style={{ marginBottom: '20px' }}>
          <h2>{video.title}</h2>
          <video width="100%" controls>
            <source src={video.url} type="video/mp4" />
          </video>
          <div>
            <button onClick={() => handleVote(video.id, 'like')}>
              {video.likes.includes("currentUser") ? "👍 (You liked this)" : "👍"} {video.likes.length}
            </button>
            <button onClick={() => handleVote(video.id, 'dislike')}>
              {video.dislikes.includes("currentUser") ? "👎 (You disliked this)" : "👎"} {video.dislikes.length}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
