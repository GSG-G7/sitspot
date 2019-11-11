import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import propTypes from 'prop-types';

import './index.css';

const FIRST_IMAGE_UPLOAD_STEP = 5;
const SECOND_IMAGE_UPLOAD_STEP = 6;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('you can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB');
  }

  return isJpgOrPng && isLt2M;
};

class UploadImg extends Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
    } else if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imgUrl => {
        const { handleChange, currentStep } = this.props;
        handleChange(
          imgUrl,
          currentStep === FIRST_IMAGE_UPLOAD_STEP ? 'img1' : 'img2'
        );
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const { loading } = this.state;
    const { values, currentStep } = this.props;
    let imgUrl;
    if (currentStep === FIRST_IMAGE_UPLOAD_STEP) {
      imgUrl = values.img1;
    } else if (currentStep === SECOND_IMAGE_UPLOAD_STEP) {
      imgUrl = values.img2;
    }

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="image">
        <div className="image__upload">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imgUrl ? (
              <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
    );
  }
}

UploadImg.propTypes = {
  values: propTypes.objectOf(propTypes.any).isRequired,
  handleChange: propTypes.func.isRequired,
  currentStep: propTypes.number.isRequired,
};

export default UploadImg;
