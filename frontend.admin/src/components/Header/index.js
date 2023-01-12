import { Layout, Row, Space } from 'antd';
import './Header.scss';

const { Header } = Layout;

function HeaderContent() {
  const user = { name: 'Admin', roleId: 'admin' };

  const handleRenderHeader = () => {
    if (user && user.roleId === 'admin') {
      return (
        <>
          <Space mode="horizontal">
            <Row style={{ color: 'white' }}>Welcome, {user.name}</Row>
          </Space>
        </>
      );
    }
  };

  return <Header className="c-header-homepage">{handleRenderHeader()}</Header>;
}

export default HeaderContent;
