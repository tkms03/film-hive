import React, { useState, useEffect } from 'react';
import MoviesShowing from './MoviesShowing';
import './MoviesShowing.css';
import config from './moviesCriteria.json';

export default function MoviesSearchShowing({ page, searchParams }) {

    // サーバーのエンドポイントURL
    // 開発環境
    // const environment = "development";
    // 本番環境
    const environment = "production";
    const envConfig = config.environments[environment];

    // ベースURL + APIパス + エンドポイントを組み立てる関数
    const getEndpointUrl = (endpointKey) => {
        return envConfig.base_url + envConfig.api_prefix + config.endpoints[endpointKey];
    };

    // "search" エンドポイントのURLを取得
    const API_URL = getEndpointUrl("search");

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
        <MoviesShowing movies={movies}/>
    );
}