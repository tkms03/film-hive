import React, { useState, useEffect } from 'react';

export default function PageControl({ currentPage, onPageChange }) {
    const [page, setPage] = useState(currentPage);

    // 親コンポーネントの currentPage を監視し、変更があれば更新
    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    const handleNext = () => {
        const newPage = page + 1;
        setPage(newPage);
        onPageChange(newPage);
    };

    const handlePrev = () => {
        const newPage = Math.max(1, page - 1);
        setPage(newPage);
        onPageChange(newPage);
    };

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