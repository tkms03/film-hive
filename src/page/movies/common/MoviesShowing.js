import React, { useState, useCallback } from 'react';
import Grid from "@mui/material/Grid2";
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import List from './List';
import PageControl from './PageControl';
import { useAppContext } from '../../../context/AppContext';
import './MoviesShowing.css';

export default function MoviesShowing({ movies }) {

    const navigate = useNavigate(); // useNavigateを使用してページ遷移を管理
    const location = useLocation(); // 現在のパスを取得

    // state管理
    // コンテキストからsearchParamsを取得
    const { searchParams, setSearchParams } = useAppContext();
    // const [searchParams, setSearchParams] = useState({});                       // 【絞り込み検索】検索パラメータ
    // クエリパラメータからpageを取得
    const queryParams = new URLSearchParams(location.search);
    const [page, setPage] = useState(parseInt(queryParams.get('page'), 10) || 1); // 現在のページ番号

    // 映画クリック時処理
    const handleClick = (id) => {
        // ページ遷移
        navigate(`/detailShowing/${id}`);
    }

    // ページ変更ボタンクリック時処理
    const updatePage = (newPage) => {
        const currentPath = location.pathname; // 現在のパスを取得
        navigate(`${currentPath}?page=${newPage}`);  // 現在のページのままページ番号だけ変更
    };

    // 画面一覧表示の画面遷移処理
    const handleComponentChange = useCallback((newComponent, newPage = 1) => {
        setPage(newPage); // ページ番号を設定
        navigate(`/${newComponent}?page=${newPage}`); // URLを変更して遷移
    }, [navigate, setPage]);


    // 絞り込み検索時の処理
    const handleSearch = useCallback((params) => {
        setSearchParams(params);
        navigate(`/searchShowing`); // 検索結果画面に遷移
    }, [navigate, setSearchParams]);

    return (
        <div className="movies-laout">
            <Grid container
                sx={{ justifyContent: "flex-start" }}
                rowSpacing={5}
            >
                <Grid xs={12} sx={{ width: '100%' }}>
                    <List setActiveComponent={handleComponentChange} onSearch={handleSearch} />
                </Grid>
                {movies.map((movie, index) => (
                    <Grid
                        size={{ xs: 6, sm: 3, md: 2, lg: 1.5 }}
                        key={movie.id}
                    >
                        <table className="table-layout"
                            onClick={() => handleClick(movie.id)}>
                            <tbody>
                                <tr>
                                    <td key={index} className="movie-layout">
                                        {/* 1タイトルの情報 */}
                                        <div>
                                            <div className="poster">
                                                {movie.poster ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                                                        className="poster-image"
                                                    />
                                                ) : (
                                                    <ImageNotSupportedIcon className="poster-image" />
                                                )}
                                            </div>
                                            <div className="info-layout">
                                                <Grid container>
                                                    <Grid size={12}>
                                                        <div className="movie-title">{movie.title}</div>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Box className="votes-layout" display="flex" justifyContent="center">
                                                            <VisibilityIcon
                                                                style={{ fontSize: 20.1, }} />
                                                        </Box>
                                                        <div className="movie-votes">{movie.voteCount}</div>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Box className="rating-layout" display="flex" justifyContent="center">
                                                            <Rating
                                                                name="disabled"
                                                                value={movie.vote_average}
                                                                size="small"
                                                                precision={0.5}
                                                                icon={<StarIcon
                                                                    sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                                                emptyIcon={<StarIcon
                                                                    sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                                                readOnly />
                                                        </Box>
                                                        <Box className="rating-layout" display="flex" justifyContent="center">
                                                            <Rating
                                                                name="disabled"
                                                                value={movie.vote_average - 5}
                                                                size="small"
                                                                precision={0.5}
                                                                icon={<StarIcon
                                                                    sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                                                emptyIcon={<StarIcon
                                                                    sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                                                readOnly />
                                                        </Box>
                                                        <div className="movie-rating">{movie.vote_average}</div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Grid>
                ))}
            </Grid>
            <Grid xs={12} sx={{ width: '100%' }}>
                <PageControl currentPage={page} onPageChange={updatePage} />
            </Grid>
        </div>
    );
}