import React, { useState } from 'react';
import './HeaderView.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LogInDialog from '../mypage/LogInDialog';
import SignInDialog from '../mypage/SignInDialog';

export default function HeaderView({ setShowMyPage, isLoggedIn, setIsLoggedIn }) {

  // 「ログイン」ダイアログの開閉状態を保持するState(falseで閉じた状態)
  const [showLogIn, setShowLogIn] = useState(false);
  // 「サインイン」ダイアログの開閉状態を保持するState(falseで閉じた状態)
  const [showSignIn, setShowSignIn] = useState(false);

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
          <ButtonGroup color="black">
            {/* 映画ページへ遷移 */}
            <Button
              className="column"
              variant="contained"
              onClick={() => setShowMyPage(false)}
              sx={{ backgroundColor: '#000', color: '#FFF' }}>映画</Button>
            {/* テレビ番組ページへ遷移 */}
            <Button className="column" variant="outlined" disabled="true">テレビ番組</Button>
          </ButtonGroup>
        </div>
        <div className="site-header-end">
          {/* マイページへ遷移、未ログインの場合、ログインダイアログを表示 */}
          {isLoggedIn ?
            // 「マイページ」ボタン 
            (< Button
              variant="outlined"
              onClick={() => setShowMyPage(true)}>
              マイページ
            </Button>)
            :
            // 「ログイン」ボタン 
            (<Button
              variant="outlined"
              onClick={() => setShowLogIn(true)}>
              ログイン
            </Button>)
          }
          {/* 「ログイン」ダイアログ */}
          <LogInDialog
            openLogIn={showLogIn}
            onCloseLogIn={() => setShowLogIn(false)}
            setShowSignIn={setShowSignIn} // SignInDialogの状態更新関数を渡す
            setIsLoggedIn={setIsLoggedIn} // ログイン状態の状態更新関数を渡す
          >
          </LogInDialog>
          {/* 「サインイン」ダイアログ */}
          <SignInDialog
            openSignIn={showSignIn}
            onCloseSignIn={() => setShowSignIn(false)}
            setShowLogIn={setShowLogIn} // LogInDialogの状態更新関数を渡す
          >
          </SignInDialog>
        </div>
      </div>
    </header >
  );
}