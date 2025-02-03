import React, { useState, useEffect } from 'react';

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
                    <td onClick={handlePrev} style={{ cursor: 'pointer' }}>前へ</td>
                    <td>{page * 20 - 19} ~ {page * 20}</td>
                    <td onClick={handleNext} style={{ cursor: 'pointer' }}>次へ</td>
                </tr>
            </tbody>
        </table>
    );
}