import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const user = useSelector((state) => state.user);

  const onsubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
    };
    Axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue(''); //저장후 빈칸으로 만들기 위해
        props.refreshFunction(response.data.result);
        setOpenReply(false); //엔터 입력후 댓글창 자동으로 닫는기능
      } else {
        alert('커멘트를 저장하지 못했습니다.');
      }
    });
  };
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const actions = [
    <LikeDislikes
      userId={localStorage.getItem('userId')}
      commentId={props.comment._id}
    />,
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{props.comment.content}</p>}
      />
      {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
        <form style={{ display: 'flex' }} onSubmit={onsubmit}>
          <Input.TextArea
            style={{
              width: '80%',
              borderRadius: '5px',
              margin: '5px 0 5px 20px',
            }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <Button
            style={{
              height: '52px',
              borderRadius: '5px',
              margin: '5px 0 5px 2px',
            }}
            onClick={onsubmit}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
