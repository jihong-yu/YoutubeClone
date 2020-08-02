import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
  const videoId = props.postId;
  const [commentValue, setcommentValue] = useState('');
  const user = useSelector((state) => state.user);

  const handleChange = (event) => {
    setcommentValue(event.currentTarget.value);
  };

  const onsubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };
    Axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setcommentValue('');
        props.refreshFunction(response.data.result);
      } else {
        alert('커멘트를 저장하지 못했습니다.');
      }
    });
  };
  return (
    <div>
      <p>Replies</p>
      <hr />
      {/* Comment Lists */}
      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={props.postId}
                />
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  commentList={props.commentList}
                  parentCommentId={comment._id}
                  postId={props.postId}
                />
              </React.Fragment>
            )
        )}
      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onsubmit}>
        <Input.TextArea
          style={{
            width: '100%',
            borderRadius: '5px',
            marginTop: '2px',
            marginRight: '2px',
          }}
          onChange={handleChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <Button
          style={{ height: '55px', marginTop: '2px', borderRadius: '5px' }}
          onClick={onsubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comment;
