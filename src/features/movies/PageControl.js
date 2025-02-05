import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from "@mui/material/Grid";
import { Typography } from '@mui/material';

export default function PageControl({ currentPage, onPageChange }) {
    const [page, setPage] = useState(currentPage);

    // 親コンポーネントの currentPage を監視し、変更があれば更新
    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    // 次ページ
    const handleNext = () => {
        const newPage = page + 1;
        handlePageChange(newPage);
    };

    // 前ページ
    const handlePrev = () => {
        const newPage = Math.max(1, page - 1);
        handlePageChange(newPage);
    };

    // ページ変更時
    const handlePageChange = (newPage) => {
        setPage(newPage);
        onPageChange(newPage);
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Grid container spacing={0}>
            {/* ページ範囲表示 */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>
                    {page * 20 - 19} - {page * 20}
                </Typography>
            </Grid>

            {/* ページコントロールボタン */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", paddingBottom: "5px"}}>
                <ButtonGroup variant="text" color='black'>
                    <Button onClick={handlePrev}>前へ</Button>
                    <Button onClick={handleNext}>次へ</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}
