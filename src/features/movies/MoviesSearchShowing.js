import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import './MoviesSearchShowing.css';

export default function MoviesSearchShowing({ page, searchParams }) {

    // サーバーのエンドポイントURL
    const API_URL = 'http://127.0.0.1:5000/api/search/';

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (searchParams) {
            fetchMovies();
        }
    }, [page, JSON.stringify(searchParams)]);  // searchParamsも依存配列に追加

    // データを取得する関数
    const fetchMovies = async () => {
        try {
            // 検索条件のパラメータ
            const params = new URLSearchParams({
                page: page,
                // keyword: searchParams.keyword || '',
                minRating: searchParams.rating?.min || 0,
                maxRating: searchParams.rating?.max || 10,
                minVotes: searchParams.votes?.min || 0,
                maxVotes: searchParams.votes?.max || 9999999,
                releaseYearFrom: searchParams.releaseYear?.from || '',
                releaseYearTo: searchParams.releaseYear?.to || '',
                genres: searchParams.genres
            });

            // クエリ文字列を生成
            const queryString = new URLSearchParams(params).toString();
            console.log('searchParams:', searchParams);
            console.log('queryString:', queryString);
            console.log('params:', params);

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
                    <Grid xs={3}>
                        <table key={movie.id}>
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
                                                        <div className="movie-Search">{movie.vote_average}</div>
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