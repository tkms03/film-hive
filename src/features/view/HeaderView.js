import React from 'react';
import './HeaderView.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function MainView() {
  return (
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <div className="site-header-start">
          {/* トップページへ遷移 */}
          <th>
            <img src="/images/logo.jpg" height="60px" />
          </th>
        </div>
        <div className="site-header-middle">
          <ButtonGroup variant="outlined" color="black">
            {/* 映画ページへ遷移 */}
            <Button className="column">映画</Button>
            {/* テレビ番組ページへ遷移 */}
            <Button className="column">テレビ番組</Button>
          </ButtonGroup>
        </div>
        <div className="site-header-end">
          {/* マイページへ遷移、未ログインの場合、ログインページへ遷移 */}
          <th className="myPage">マイページ</th>
        </div>
      </div>
    </header>
  );
}