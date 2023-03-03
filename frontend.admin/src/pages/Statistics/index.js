import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spin, Upload } from 'antd';

function Statistics() {
  const fileList = [
    {
      uid: '0',
      name: 'sample-loading.png',
      status: 'uploading',
      percent: 33,
    },
    {
      uid: '-1',
      name: 'sample-bird.png',
      status: 'done',
      url: 'https://thanhphochomeo.b-cdn.net/wp-content/uploads/2019/12/chich-cheo-lua-2.png',
      thumbUrl:
        'https://thanhphochomeo.b-cdn.net/wp-content/uploads/2019/12/chich-cheo-lua-2.png',
    },
    {
      uid: '-2',
      name: 'sample-error.png',
      status: 'error',
    },
  ];

  return (
    <>
      <h2>Statistics Page</h2>
      <div style={{ width: '50%' }}>
        <Upload.Dragger
          multiple
          action={'http://localhost:3001/dashboard/statistics'}
          listType="picture"
          accept=".png,.jpg,.jpeg"
          showUploadList={{ showRemoveIcon: true }}
          defaultFileList={[...fileList]}
          beforeUpload={(file) => {
            console.log(file);
            return false;
          }}
          iconRender={() => {
            return <Spin></Spin>;
          }}
          progress={{
            strokeWidth: 3,
            strokeColor: {
              '0%': '#f2635f',
              '100%': '#55d983',
            },
            style: { top: 10 },
          }}
        >
          <Button>
            <FontAwesomeIcon icon={faUpload} style={{ marginRight: 10 }} />{' '}
            Upload
          </Button>
        </Upload.Dragger>
      </div>
    </>
  );
}

export default Statistics;
