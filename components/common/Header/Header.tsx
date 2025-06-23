import React from 'react';
import {
  Input,
  Avatar,
  Layout,
  Space,
  Tooltip,
  Switch,
  Button,
  Affix,
} from 'antd';
import { GithubFilled, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { GIT_REPO_URL } from '@/config';
import LogoSmall from '@assets/bookmark-icon.png';
import styles from '@components/common/Header/Header.module.scss';

const { Header } = Layout;
const { Search } = Input;

type AppHeaderProps = {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  filterByFavorites?: boolean;
  setFilterByFavorites?: (filter: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  filterByFavorites,
  setFilterByFavorites,
  collapsed,
  setCollapsed,
}) => {
  const handleSearch = (value: string) => {
    setSearchQuery && setSearchQuery(value);
  };

  const handleFilterChange = (checked: boolean) => {
    setFilterByFavorites && setFilterByFavorites(checked);
  };

  return (
    <Affix>
      <Header className={styles.appHeader}>
        <div className={styles.appHeaderContent}>
          <div className={styles.navLeftSide}>
            <Button
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <span
              className={`${styles.logoSmall} ${collapsed ? styles.showLogo : ''}`}
            >
              <Link to="/">
                <img src={LogoSmall} alt="BookMart" />
              </Link>
            </span>
            {setSearchQuery && (
              <>
                <Search
                  placeholder="Search books"
                  value={searchQuery}
                  onSearch={handleSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: 200 }}
                />
                <Switch
                  checked={filterByFavorites}
                  onChange={handleFilterChange}
                  checkedChildren="Favorites"
                  unCheckedChildren="All"
                />
              </>
            )}
          </div>
          <div>
            <Space>
              <Tooltip title="Vist Repository">
                <a
                  key="github-link"
                  href={GIT_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Avatar
                    icon={<GithubFilled />}
                    className={styles.profileIcon}
                  />
                </a>
              </Tooltip>
              <Avatar icon={<UserOutlined />} className={styles.profileIcon} />
            </Space>
          </div>
        </div>
      </Header>
    </Affix>
  );
};

export default AppHeader;
