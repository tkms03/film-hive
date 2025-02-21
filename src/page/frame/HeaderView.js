import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderView.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LogInDialog from '../login/LogInDialog';
import SignInDialog from '../login/SignInDialog';

export default function HeaderView({ setShowMyPage, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate(); // useNavigateを使用してページ遷移を管理

  // 「ログイン」ダイアログの開閉状態を保持するState(falseで閉じた状態)
  const [showLogIn, setShowLogIn] = useState(false);
  // 「サインイン」ダイアログの開閉状態を保持するState(falseで閉じた状態)
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <div className="site-header-start">
          {/* トップページへ遷移 */}
          <Link to="/">
            <img src="/images/logo.jpg" height="60px" alt="Logo" />
          </Link>
        </div>
        <div className="site-header-middle">
          <ButtonGroup color="black">
            {/* 映画ページへ遷移 */}
            <Button
              className="column"
              variant="contained"
              onClick={() => {
                setShowMyPage(false);
                navigate('/movies'); // 映画ページへ遷移
              }}
              sx={{ backgroundColor: '#000', color: '#FFF' }}
            >
              映画
            </Button>
            {/* テレビ番組ページへ遷移（現在は無効） */}
            <Button className="column" variant="outlined" disabled={true}>
              テレビ番組
            </Button>
          </ButtonGroup>
        </div>
        <div className="site-header-end">
          {/* マイページへ遷移、未ログインの場合、ログインダイアログを表示 */}
          {isLoggedIn ? (
            // 「マイページ」ボタン 
            <Button
              variant="outlined"
              onClick={() => {
                setShowMyPage(true);
                navigate('/myPage'); // マイページへ遷移
              }}
            >
              マイページ
            </Button>
          ) : (
            // 「ログイン」ボタン 
            <Button
              variant="outlined"
              onClick={() => setShowLogIn(true)}
            >
              ログイン
            </Button>
          )}
          {/* 「ログイン」ダイアログ */}
          <LogInDialog
            openLogIn={showLogIn}
            onCloseLogIn={() => setShowLogIn(false)}
            setShowSignIn={setShowSignIn} // SignInDialogの状態更新関数を渡す
            setIsLoggedIn={setIsLoggedIn} // ログイン状態の状態更新関数を渡す
          />
          {/* 「サインイン」ダイアログ */}
          <SignInDialog
            openSignIn={showSignIn}
            onCloseSignIn={() => setShowSignIn(false)}
            setShowLogIn={setShowLogIn} // LogInDialogの状態更新関数を渡す
          />
        </div>
      </div>
    </header>
  );
}
