<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
=======
import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
<<<<<<< HEAD
} from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState('');
  const [Dislikes, setDislikes] = useState(0);
  const [DisLikeAction, setDisLikeAction] = useState('');

  let variable = {};
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
=======
} from '@ant-design/icons'
import Axios from 'axios'

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0)
  const [LikeAction, setLikeAction] = useState('')
  const [Dislikes, setDislikes] = useState(0)
  const [DisLikeAction, setDisLikeAction] = useState('')

  let variable = {}
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId }
  } else {
    variable = { commentId: props.commentId, userId: props.userId }
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
  }

  useEffect(() => {
    Axios.post('/api/like/getLikes', variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 좋아요를 받았는지
<<<<<<< HEAD
        console.log(response.data.likes);
        setLikes(response.data.likes.length);
=======
        console.log(response.data.likes)
        setLikes(response.data.likes.length)
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
        //내가 좋아요를 이미 눌렀는지
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            //pros.userId는 로그인한 사용자의 Id이기때문
<<<<<<< HEAD
            setLikeAction('liked');
          }
        });
      } else {
        alert('Like에 대한 정보를 가져오지 못했습니다.');
      }
    });
    Axios.post('/api/like/getDislikes', variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 싫어요를 받았는지
        setDislikes(response.data.dislikes.length);
=======
            setLikeAction('liked')
          }
        })
      } else {
        alert('Like에 대한 정보를 가져오지 못했습니다.')
      }
    })
    Axios.post('/api/like/getDislikes', variable).then((response) => {
      if (response.data.success) {
        //얼마나 많은 싫어요를 받았는지
        setDislikes(response.data.dislikes.length)
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
        //내가 싫어요를 이미 눌렀는지
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            //pros.userId는 로그인한 사용자의 Id이기때문
<<<<<<< HEAD
            setDisLikeAction('disliked');
          }
        });
      } else {
        alert('DisLike에 대한 정보를 가져오지 못했습니다.');
      }
    });
  }, []);
=======
            setDisLikeAction('disliked')
          }
        })
      } else {
        alert('DisLike에 대한 정보를 가져오지 못했습니다.')
      }
    })
  }, [])
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604

  const onLike = () => {
    if (LikeAction === '') {
      Axios.post('/api/like/upLike', variable).then((response) => {
        if (response.data.success) {
<<<<<<< HEAD
          setLikes(Likes + 1);
          setLikeAction('liked');

          if (DisLikeAction !== '') {
            setDisLikeAction('');
            setDislikes(Dislikes - 1);
          }
        } else {
          alert('Like를 올리지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction('');
        } else {
          alert('Like를 내리지 못했습니다.');
        }
      });
    }
  };
=======
          setLikes(Likes + 1)
          setLikeAction('liked')

          if (DisLikeAction !== '') {
            setDisLikeAction('')
            setDislikes(Dislikes - 1)
          }
        } else {
          alert('Like를 올리지 못했습니다.')
        }
      })
    } else {
      Axios.post('/api/like/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1)
          setLikeAction('')
        } else {
          alert('Like를 내리지 못했습니다.')
        }
      })
    }
  }
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604

  const onDislike = () => {
    if (DisLikeAction !== '') {
      Axios.post('/api/like/unDislike', variable).then((response) => {
        if (response.data.success) {
<<<<<<< HEAD
          setDislikes(Dislikes - 1);
          setDisLikeAction('');
        } else {
          alert('dislike를 지우지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/upDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDisLikeAction('disliked');

          if (LikeAction !== '') {
            setLikeAction('');
            setLikes(Likes - 1);
          }
        } else {
          alert('dislike를 올리지 못했습니다.');
        }
      });
    }
  };
=======
          setDislikes(Dislikes - 1)
          setDisLikeAction('')
        } else {
          alert('dislike를 지우지 못했습니다.')
        }
      })
    } else {
      Axios.post('/api/like/upDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1)
          setDisLikeAction('disliked')

          if (LikeAction !== '') {
            setLikeAction('')
            setLikes(Likes - 1)
          }
        } else {
          alert('dislike를 올리지 못했습니다.')
        }
      })
    }
  }
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {LikeAction === '' ? (
            <LikeOutlined onClick={onLike} />
          ) : (
            <LikeFilled onClick={onLike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: '4px', cursor: 'auto' }}> {Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike" style={{ marginLeft: '4px' }}>
        <Tooltip title="Dislike">
          {DisLikeAction === '' ? (
            <DislikeOutlined onClick={onDislike} />
          ) : (
            <DislikeFilled onClick={onDislike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: '4px', cursor: 'auto' }}> {Dislikes}</span>
      </span>
      &nbsp;&nbsp;
    </div>
<<<<<<< HEAD
  );
}

export default LikeDislikes;
=======
  )
}

export default LikeDislikes
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
