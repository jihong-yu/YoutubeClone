import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Title, Text } = Typography;

const PrivateOptions = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const CategoryOptions = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' },
];
const VideoUploadPage = (props) => {
  const user = useSelector((state) => state.user);
  //크롬 redux스토어 도구를 보면 user라는 state가 있다.
  //해당 state의 모든 json 데이터 들이 user라는 변수에 담긴다.

  const [VideoTitle, setVideoTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('Film & Animation');

  const [FilePath, setFilePath] = useState('');
  const [Duration, setDuration] = useState('');
  const [ThumbnailPath, setThumbnailPath] = useState('');

  const [isSubmitting, setisSubmitting] = useState(false);
  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault(); //새로고침방지

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    Axios.post('/api/video/uploadVideo', variables).then((response) => {
      if (response.data.success) {
        message.success('성공적으로 업로드를 했습니다.');
        setisSubmitting(!isSubmitting);
        setTimeout(() => {
          props.history.push('/');
        }, 3000);
      } else {
        alert('비디오 업로드에 실패 했습니다.');
      }
    });
  };
  const onDrop = (files) => {
    //올린파일에대한 정보가 files에대입

    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    Axios.post('/api/video/uploadfiles', formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);

        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.url); //동영상주소

        Axios.post('/api/video/thumbnail', variable).then((response) => {
          if (response.data.success) {
            console.log(response.data);
            setDuration(response.data.fileDuration); //동영상길이
            setThumbnailPath(response.data.url); //썸네일주소
          } else {
            alert('썸네일 생성에 실패했습니다.');
          }
        });
      } else {
        alert('비디오 업로드를 실패했습니다.');
      }
    });
  };
  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '2rem auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <Title level={2}>
          <Text keyboard>Upload Video</Text>
        </Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop zone 부분*/}

          <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: '5rem' }} />
              </div>
            )}
          </Dropzone>
          {/* 썸네일부분 */}
          {ThumbnailPath && (
            <div>
              <img src={`http://localhost:5000/${ThumbnailPath}`} alt="haha" />
            </div>
          )}
        </div>
        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((
            item,
            index //map함수는 무조건 key값을 줘야한다.(성능문제)
          ) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((
            item,
            index //map함수는 무조건 key값을 줘야한다.(성능문제)
          ) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button
          type="primary"
          size="large"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default VideoUploadPage;
