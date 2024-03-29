import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, List } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
<<<<<<< HEAD
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';
=======
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  //랜딩페이지에서 주소창뒤에 videoId를 보내주고있기때문에가능
  const variable = { videoId: videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
<<<<<<< HEAD
  const [Comments, setComments] = useState([]);
=======
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604

  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert('비디오 정보를 가져오길 실패했습니다.');
      }
    });
<<<<<<< HEAD

    Axios.post('/api/comment/getComments', variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.comments);
        setComments(response.data.comments);
      } else {
        alert('코멘트 정보를 가져오는 것을 실패 하였습니다.');
      }
    });
=======
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
  }, []);

  if (VideoDetail.writer) {
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem('userId') && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem('userId')}
      /> //만약 페이지의 동영상이 본인의 동영상이면 구독버튼을 안보이게만든다.
    );

<<<<<<< HEAD
    const refreshFunction = (newComment) => {
      //부모의 Comments state값을 업데이트하기위한 함수
      setComments(Comments.concat(newComment)); //자식들한테 값을 전달받아 Comments값 업데이트
    };

=======
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
    //witer를 서버에서 가져오기전에 페이지를 렌더링 할려고해서
    //VideoDetail.writer.image 부분에서 type error가 발생한다.
    return (
      <Row gutter={(16, 16)}>
        <Col lg={18} xs={24}>
          <div
            style={{
              width: '100%',
              padding: '3rem 4rem',
            }}
          >
            <video
              style={{ width: '100%' }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            />
<<<<<<< HEAD
            <List.Item
              actions={[
                <LikeDislikes
                  video={true}
                  userId={localStorage.getItem('userId')}
                  videoId={videoId}
                />,
                subscribeButton,
              ]}
            >
=======
            <List.Item actions={[subscribeButton]}>
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={VideoDetail.description}
              />
            </List.Item>
            {/* comment*/}
<<<<<<< HEAD
            <Comment
              postId={videoId}
              commentList={Comments}
              refreshFunction={refreshFunction}
            />
=======
>>>>>>> 4fda55c8871c05a3a294792129f0ef8fd6422604
          </div>
        </Col>

        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...loding</div>;
  }
}

export default VideoDetailPage;
