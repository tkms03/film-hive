import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import MoviesCurrentlyShowing from '../movies/MoviesCurrentlyShowing';
import MoviesPopularityShowing from '../movies/MoviesPopularityShowing';
import MoviesSearchShowing from '../movies/MoviesSearchShowing';
import MoviesDetailShowing from '../detail/MoviesDetailShowing';
import './MainView.css';
import MyPage from '../mypage/MyPage';

export default function MainView() {

    return (
        <Grid container spacing={0} sx={{ width: '100%' }}>
            <Grid xs={12} sx={{ width: '100%' }}>
                <Routes>
                    {/* Routeごとに対応するコンポーネントを表示 */}
                    <Route path="/" element={<MoviesCurrentlyShowing />} />
                    <Route path="/currentlyShowing" element={<MoviesCurrentlyShowing />} />
                    <Route path="/popularityShowing" element={<MoviesPopularityShowing />} />
                    <Route path="/searchShowing" element={<MoviesSearchShowing />} />
                    <Route path="/detailShowing" element={<MoviesDetailShowing />} />
                </Routes>
            </Grid>
        </Grid>
    );
}
