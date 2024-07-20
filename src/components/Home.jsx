import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';

import '../css/Home.css'
import OverlayButton from './overlayButton/OverlayButton';
import Modal from './modal/Modal';
import Input from './input/Input';
import TextArea from './textArea/TextArea';
import Button from './button/Button';
import { FiPlusCircle } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';

function Home() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  async function fetchPosts() {
    const { DEV, VITE_API_URL } = import.meta.env;
    let apiUrl = VITE_API_URL;
    if (DEV) {
      apiUrl = "http://localhost:8000/api/";
    }

    const response = await fetch(apiUrl + 'posts/');
    if (!response.ok) {
      alert('An error occurred while fetching the posts!');
      throw new Error(`Response status: ${response.status}`);
    }

    const posts = await response.json();
    setPosts(posts);
  }

  function handleOpenModal() {    
    openModal();
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setPostContent("");
    setPostTitle("");
  }

  function handlePostContentChange(event) {
    setPostContent(event.target.value);
  }

  function handlePostTitleChange(event) {
    setPostTitle(event.target.value);
  }

  async function handleSavePost() {
    const { DEV, VITE_API_URL } = import.meta.env;
    let apiUrl = VITE_API_URL;
    if (DEV) {
      apiUrl = "http://localhost:8000/api/";
    }

    const response = await fetch(apiUrl + 'posts/', {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        title: postTitle,
        content: postContent
      })
    });
    
    if (!response.ok) {
      alert('An error occurred while saving the post!');
      throw new Error(`Response status: ${response.status}`);
    }
    
    const createdPost = await response.json();
    setPosts([...posts, createdPost]);
    closeModal();
    alert('Post saved successfully!');
  }

  function ModalHeader() {
    return (
      <div className="modal-header">
        <h2 className="modal-title">Add your post!</h2>
        <IoCloseOutline className="modal-close" onClick={closeModal}/>
      </div>
    );
  }

  return (
    <div>
      <div className="blog-container">
        {
          posts.length ? posts.map((post, index) => {
            return (
              <BlogPost
                title={post.title}
                content={post.content}
                postComments={post.comments}
                id={post.id}
                key={index}
              />
            );
          }) : (
            <div className="blog-no-posts">
              No posts yet
            </div>
          )
        }

        <OverlayButton onClick={handleOpenModal} tooltip={"Post!"} />
        <Modal show={showModal} handleClose={closeModal} header={<ModalHeader/>}>
          <Input
            id="post-title"
            label="Title"
            value={postTitle}
            onChange={handlePostTitleChange}
            placeholder="Post title..."
          />
          <TextArea 
            placeholder="Write your post here..."
            text={postContent}
            handleTextChange={handlePostContentChange}
            label="Post content"
          />
          <Button onClick={handleSavePost}>
            Save Post <FiPlusCircle/>
          </Button>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
