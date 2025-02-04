import React, { useState } from 'react';
import Grid from '@mui/material/Grid'
import List from '../movies/List';
import MoviesCurrentlyShowing from '../movies/MoviesCurrentlyShowing';
import MoviesPopularityShowing from '../movies/MoviesPopularityShowing';
import MoviesRatingShowing from '../movies/MoviesRatingShowing';
import PageControl from '../movies/PageControl';
import MoviesSearchShowing from '../movies/MoviesSearchShowing';
import './MainView.css'

export default function MainView() {
    // ページ番号を管理
    const [page, setPage] = useState(1);
    // 表示コンポーネントを管理
    const [activeComponent, setActiveComponent] = useState('currentlyShowing');
    // 検索パラメータを管理
    const [searchParams, setSearchParams] = useState(null);

    // 動的に切り替えるコンポーネントのマッピング
    const components = {
        currentlyShowing: <MoviesCurrentlyShowing page={page} />,
        popularityShowing: <MoviesPopularityShowing page={page} />,
        ratingShowing: <MoviesRatingShowing page={page} />,
        searchShowing: <MoviesSearchShowing page={page} searchParams={searchParams} />, // 検索パラメータを渡す
    };

    // PageControl からページ番号を受け取る
    const updatePage = (newPage) => {
        setPage(newPage);
    };

    // コンポーネントを切り替えた際にページ番号をリセットする関数
    const handleComponentChange = (newComponent) => {
        // 絞り込み検索以外の場合、処理を行う
        if (newComponent != ('searchShowing')) {
            setActiveComponent(newComponent);
            setPage(1); // ページ番号をリセット
        }
    };

    // 🔥 検索時の処理
    const handleSearch = (params) => {
        setSearchParams(params); // 🔥 検索パラメータを更新
        setActiveComponent('searchShowing'); // 🔥 検索結果画面に切り替え
    };

    return (
        <div>
            <div>
                <List setActiveComponent={handleComponentChange} onSearch={handleSearch} />
            </div>
            <div>
                {components[activeComponent]}
                <PageControl currentPage={page} onPageChange={updatePage} />
            </div>
        </div>
        // <Grid container spacing={0}>
        //     <Grid xs={2}>
        //         <List setActiveComponent={handleComponentChange} onSearch={handleSearch} />
        //     </Grid>
        //     <Grid xs={10}>
        //         {components[activeComponent] }
        //         <PageControl currentPage={page} onPageChange={updatePage} />
        //     </Grid>
        // </Grid>
    );
}