import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import './App.css';
import MainView from './page/frame/MainView';
import HeaderView from './page/frame/HeaderView';
import MyPage from './page/mypage/MyPage';
import MoviesDetailShowing from './page/detail/MoviesDetailShowing';
import { AppProvider } from './context/AppContext';

function App() {

    // 「ログイン」ボタンと「マイページ」ボタンの表示状態を管理
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // 映画詳細表示の有無を管理
    const [showMovieDetail, setShowMovieDetail] = useState(false);
    // マイページ表示の有無を管理
    const [showMyPage, setShowMyPage] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("translate", "no");
    }, []);

    return (
        <AppProvider>
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
                    {/* マイページ、映画詳細、映画一覧の表示を制御 */}
                    <Routes>
                        <Route path="/*" element={<MainView />} />
                        <Route path="/myPage" element={isLoggedIn ? <MyPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
                    </Routes>
                    {/* {showMyPage ? (
                        <MyPage setShowMyPage={setShowMyPage} setIsLoggedIn={setIsLoggedIn} />
                    ) : showMovieDetail ? (
                        <MoviesDetailShowing setShowMovieDetail={setShowMovieDetail} />
                    ) : (
                        <MainView setShowMovieDetail={setShowMovieDetail} />
                    )} */}
                </Grid>
            </Grid>
        </AppProvider>
    );
}

export default App;
