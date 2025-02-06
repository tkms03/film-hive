import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import './MainApp.css';
import MainView from './features/view/MainView';
import HeaderView from './features/view/HeaderView';
import MyPage from './features/mypage/MyPage';

function MainApp() {

    // 「ログイン」ボタンと「マイページ」ボタンの表示状態を管理
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // マイページ表示の有無を管理
    const [showMyPage, setShowMyPage] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("translate", "no");
    }, []);

    return (
        <Grid container spacing={0} sx={{ width: '100%' }}>
            <Grid
                xs={12}
                sx={{
                    width: '100%',
                    position: 'sticky',
                    top: 0, // スクロール時に上部に固定
                    zIndex: 1100, // ヘッダーが他の要素の上に表示されるように
                    backgroundColor: 'white', // 背景色を設定（必要な場合）
                }}>
                <HeaderView
                    setShowMyPage={setShowMyPage}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn} />
            </Grid>
            <Grid xs={12} sx={{ width: '100%' }}>
                {/* 「マイページ」と「一覧画面」の表示切替 */}
                {showMyPage ? <MyPage setShowMyPage={setShowMyPage} setIsLoggedIn={setIsLoggedIn} /> : <MainView />}
            </Grid>
        </Grid>
    );
}

export default MainApp;
