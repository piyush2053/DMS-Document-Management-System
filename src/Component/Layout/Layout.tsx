import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { items } from '../Constants/constants';
import Documents from '../Modules/Documents';
import Upload from '../Modules/Uploads';
import History from '../Modules/History';

const { Content, Footer, Sider } = Layout;

const LayoutS: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Documents />;
      case '2':
        return <Upload />;
      case '3':
        return <History />;
      default:
        return <Documents />;
    }
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu className='bg-[#ECEFF1] min-h-[100%]' theme='light' defaultSelectedKeys={['1']} items={items} onClick={handleMenuClick} expandIcon={<p>aaaaa</p>} />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Document Management System
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutS;
