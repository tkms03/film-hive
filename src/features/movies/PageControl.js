import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td><Button onClick={handlePrev} style={{ cursor: 'pointer' }}>前へ</Button></td>
                    <td><p>{page * 20 - 19} ~ {page * 20}</p></td>
                    <td><Button onClick={handleNext} style={{ cursor: 'pointer' }}>次へ</Button></td>
                </tr>
            </tbody>
        </table>
    );
}