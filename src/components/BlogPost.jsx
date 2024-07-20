import React, { useEffect, useState } from "react";
import Accordion from './accordion/Accordion';
import CommentAccordionItem from './commentAccordionItem/CommentAccordionItem';
import TextArea from './textArea/TextArea';
import Button from './button/Button';
import { FiPlusCircle } from "react-icons/fi";

import '../css/BlogPost.css';
import Input from "./input/Input";

function BlogPost({ id, title, content, postComments }) {
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(postComments);
  }, []);

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  function toggleAccordion() {
    setIsOpen(!isOpen);
  }

  function handleCommentAuthorChange(event) {
    setCommentAuthor(event.target.value);
  }

  function handleCommentEmailChange(event) {
    setCommentEmail(event.target.value);
  }

  async function handleSaveComment() {
    const { DEV, VITE_API_URL } = import.meta.env;
    let apiUrl = VITE_API_URL;
    if (DEV) {
      apiUrl = "http://localhost:8000/api/";
    }

    const response = await fetch(apiUrl + 'posts/' + id + "/comments/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        name: commentAuthor,
        content: comment,
        email: commentEmail
      })
    });
    
    if (!response.ok) {
      console.log(await response.json());
      alert('An error occurred while saving the comment!');
      throw new Error(`Response status: ${response.status}`);
    }
    
    const createdComment = await response.json();
    setComments([...comments, createdComment]);
    setComment("");
    setCommentAuthor("");
    setCommentEmail("");
    alert('Comment saved successfully!');
  }

  return (
    <div className="blog-post">
      <h3 className="blog-post-title">
        {title}
      </h3>
      <div className="blog-post-content">
        {content}
      </div>
      {comments && comments.length > 0 ? <Accordion title={"Comments"} isOpen={isOpen} toggleAccordion={toggleAccordion}>
        <div className='accordion-children-container'>
        {
          comments.map((item, index) => {
            return (
              <CommentAccordionItem key={index} name={item.name} email={item.email} content={item.content}/>
            );
          })
        }
        </div>
      </Accordion> : <div className="no-comments-yet">No comments yet!</div>}
      <div className="write-commment-container">
        <Input
          id="comment-author"
          label="Author"
          value={commentAuthor}
          onChange={handleCommentAuthorChange}
          placeholder="Type your name"
        />
        <Input
          id="comment-email"
          label="Email"
          value={commentEmail}
          onChange={handleCommentEmailChange}
          placeholder="Type your email"
        />
        <TextArea 
          placeholder="Write a comment"
          text={comment}
          handleTextChange={handleCommentChange}
          label="Comment"
        />
        <Button onClick={handleSaveComment}>
          Save Comment <FiPlusCircle/>
        </Button>
      </div>
    </div>
  );
}

export default BlogPost;