// import React from 'react';
import React, { useState, useEffect } from 'react';
import MoviesShowing from './MoviesShowing';
import './MoviesShowing.css';
import config from './moviesCriteria.json';

export default function MoviesRatingShowing({ page }) {

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

    // "rating" エンドポイントのURLを取得
    const API_URL = getEndpointUrl("rating");

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
        <MoviesShowing movies={movies}/>
    );
}