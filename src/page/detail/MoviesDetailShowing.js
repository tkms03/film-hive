// import React from 'react';
import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import config from 'config.json';

export default function MoviesDetailShowing() {

    const { id } = useParams();

    // サーバーのエンドポイントURL
    // 開発環境
    const environment = "development";
    // 本番環境
    // const environment = "production";
    const envConfig = config.environments[environment];

    // ベースURL + APIパス + エンドポイントを組み立てる関数
    const getEndpointUrl = (endpointKey) => {
        return envConfig.base_url + envConfig.api_prefix + config.endpoints[endpointKey];
    };

    // "movies" エンドポイントのURLを取得
    const API_URL = getEndpointUrl("detail");

    const [detailData, setDetailData] = useState([]);

    // データを取得する関数
    const fetchMovies = async () => {
        try {
            // 検索条件のパラメータ
            const searchParams = {
                movie_id: id,  // 映画ID
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
            setDetailData(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        // <DetailShowing detailData={detailData}>
            <Grid container rowSpacing={2}>
                {/* 12:タイトル、公開日*/}
                {/* 12:原題、元の言語、製造会社、生産国*/}
                {/* 12:時間、ジャンル */}
                {/* 12:コンテナ */}
                {/*   3:ポスター */}
                {/*   9:コンテナ */}
                {/*     12:評価数、評価 */}
                {/*     12:ボタン、HP */}
                {/*     12:あらすじ */}
                {/*     12:予算、収益 */}
                {/* 12:キャスト、スタッフ */}
                {/* 12*おすすめ   */}
                <Grid item xs={6}>
                </Grid>
            </Grid>


        // </DetailShowing>
    );
}