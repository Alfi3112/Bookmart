import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Logo from '@assets/logo-full.png';
import styles from '@components/common/Sidebar/Sidebar.module.scss';
import ErrorBoundary from '@/components/ErrorBoundray';

const { Sider } = Layout;

const menuItems = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
    name: '/',
  },
  {
    key: '2',
    icon: <PlusOutlined />,
    label: <Link to="/create">Add New Book</Link>,
    name: '/create',
  },
];

type SidebarPropsType = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Sidebar: React.FC<SidebarPropsType> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const getSelectedKey = useCallback(() => {
    const currentPath = location.pathname;
    const selectedItem = menuItems.find((item) => item.name === currentPath);
    return selectedItem ? selectedItem.key : '1';
  }, [location.pathname]);

  return (
    <div>
      <ErrorBoundary>
        <Sider
          collapsible
          trigger={null}
          collapsed={collapsed}
          className={styles.sidebarWrapper}
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed) => {
            setCollapsed(collapsed);
          }}
          style={{
            overflow: 'auto',
            height: '80vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className={styles.logoVertical}>
            <Link to="/">
              <img width={150} src={Logo} alt="BookMart" />
            </Link>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[getSelectedKey()]}
            items={menuItems}
          />
        </Sider>
      </ErrorBoundary>
    </div>
  );
};

export default Sidebar;
