import React from 'react';
import './Header.css';

const Header = ({liked, allPosts}) => {
  return (
    <div className="app-header d-flex">
      <h1>Artsiom Zavaley</h1>
      <h2>{allPosts} записей, из них понравилось {liked}</h2>
    </div>
  )
}

export default Header;