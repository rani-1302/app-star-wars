import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import FavouritesList from './pages/FavouritesList';
import { Layout, Typography } from 'antd';

const AppLayout: React.FC = () => {
  const { Title } = Typography;
  const { Header, Content } = Layout;

  return (
    <Layout className="layout">
      <Router>
        <Header className="navbar" aria-label="Main navigation">
          <div className="navbar-content">
            <Title level={3} className="navbar-title">
              <Link to="/" className="navbar-title-link" aria-label="Home page">
                Star Wars Characters
              </Link>
            </Title>
            <Link
              to="/favourites"
              className="favourites-link"
              aria-label="View Favourites"
            >
              View Favourites
            </Link>
          </div>
        </Header>
        <Content className="content" aria-label="Main content">
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/favourites" element={<FavouritesList />} />
          </Routes>
        </Content>
      </Router>
    </Layout>
  );
};

export default AppLayout;
