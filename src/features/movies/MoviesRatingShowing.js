// import React from 'react';
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import './MoviesRatingShowing.css';

export default function MoviesRatingShowing({ page }) {

    // サーバーのエンドポイントURL
    const API_URL = 'http://127.0.0.1:5000/api/rating/';

    const [movies, setMovies] = useState([]);

    // データを取得する関数
    const fetchMovies = async () => {
        try {
            // 検索条件のパラメータ
            const searchParams = {
                page: page,  //ページ数
            };

            // クエリ文字列を生成
            const queryString = new URLSearchParams(searchParams).toString();

            const response = await fetch(`${API_URL}?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Movies:', data);
            dataCreate(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    // pageを取得した場合、映画情報を20件表示する
    useEffect(() => {
        fetchMovies();
    }, [page]);

    function dataCreate(res) {
        let data = [];
        if (res && res.results && Array.isArray(res.results)) {
            res.results.forEach(movie => {
                // 各映画の情報をdataに追加
                data.push({
                    title: movie.title,
                    poster: movie.poster_path,
                    voteCount: movie.vote_count,
                    vote_average: movie.vote_average
                });
            });
            setMovies(data); // 状態を更新
        }
    }

    return (
        <div className="movies-laout">
            <Grid container>
                {movies.map((movie, index) => (
                    <Grid xs={3} key={movie.id}>
                        <table>
                            <tbody>
                                <tr>
                                    <td key={index} className="movie-layout">
                                        {/* 1タイトルの情報 */}
                                        <div>
                                            <div className="poster">
                                                {movie.poster ? (
                                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster}`} alt={movie.title}></img>
                                                ) : (
                                                    <>{movie.title}</>
                                                )}
                                            </div>
                                            <div className="info-layout">
                                                <Grid container>
                                                    <Grid xs={12}>
                                                        <div className="movie-title">{movie.title}</div>
                                                    </Grid>
                                                    <Grid xs={6}>
                                                        <div className="movie-votes">{movie.voteCount}</div>
                                                    </Grid>
                                                    <Grid xs={6}>
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
        </div>
    );
}