import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesShowing from './common/MoviesShowing';
import { useAppContext } from 'context/AppContext'
import config from 'config.json';

export default function MoviesSearchShowing() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') || 1; // デフォルトは1

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

    const { searchParams } = useAppContext(); // searchParamsを取得

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
                    id: movie.id,
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
        <MoviesShowing movies={movies} page={page} />
    );
}