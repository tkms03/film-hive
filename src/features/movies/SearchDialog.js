import React, { useState } from "react";
import { createPortal } from "react-dom";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Slider, TextField, FormControlLabel, Checkbox, Typography, Box } from '@mui/material'
import './SearchDialog.css'
import searchCriteria from './searchCriteria.json';  // JSONをインポート

export default function SearchDialog({ onSearch }) {

    // ダイアログの開閉状態を表すState(falseで閉じた状態)
    const [show, setShow] = useState(false);
    // カレンダーの表示制御用ステート（FROM,TO）
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    // キーワード
    // const [keyword, setKeywordValue] = useState();
    // 評価（最小、最大）
    const [ratingValue, setRatingValue] = useState([0, 10]);
    // 投票数（最小、最大）
    const [voteValue, setVoteValue] = useState([0, 10]);
    // ジャンル
    const [checkboxes, setCheckboxes] = useState({});
    // 日付の状態
    const [valueFrom, setValueFrom] = useState(null);
    const [valueTo, setValueTo] = useState(null);
    const currentYear = dayjs();
    const theme = createTheme();

    // ボタンクリック時のハンドラー(stateをオンオフ)
    const handleDialog = () => setShow(s => !s);

    // 検索ボタンをクリック
    const handleSearchClick = () => {
        // 収集した検索条件を親コンポーネントに渡す
        if (typeof onSearch === "function") {

            // スライダーの選択値に基づいてラベルを設定
            const getVoteLabel = (value) => {
                const mark = searchCriteria.scaleMarks.find((mark) => mark.value === value);
                return mark ? mark.valueBehind : '';
            };

            const searchData = {
                // keyword: keyword,
                releaseYear: {
                    from: valueFrom ? valueFrom.toDate().toLocaleDateString(
                        "ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }).replaceAll('/', '-') : '',
                    to: valueTo ? valueTo.toDate().toLocaleDateString(
                        "ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }).replaceAll('/', '-') : ''
                },
                rating: {
                    min: ratingValue[0],
                    max: ratingValue[1]
                },
                votes: {
                    min: getVoteLabel(voteValue[0]),
                    max: getVoteLabel(voteValue[1])
                },
                genres: searchCriteria.genres
                    .map(genre => genre.id)
                    .filter(id => checkboxes[id])
                    .join('|')
            };
            onSearch(searchData, true);  // 第2引数で「検索画面へ移動」を指示、親コンポーネントにデータを渡す
        } else {
            console.error("Error: onSearch is not a function!", onSearch);
        }
        setShow(false);  // ダイアログを閉じる
    };

    // キーワードを更新
    // const handleKeywordChange = (event) => {
    //     setKeywordValue(event.target.value);
    // };

    // 評価を更新
    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };
    const handleVoteChange = (event, newValue) => {
        setVoteValue(newValue);
    };

    // チェックボックスの状態を更新
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        // const genreValue = searchCriteria.genres.find(g => g.id === name)?.value;
        setCheckboxes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // クリアボタンのクリック時の処理
    const onClearFrom = () => {
        setValueFrom(null);
        setOpenFrom(false);
    };

    const onClearTo = () => {
        setValueTo(null);
        setOpenTo(false);
    };

    // 日付を選択したときのハンドラー
    const handleDateChangeFrom = (newValue) => setValueFrom(newValue);
    const handleDateChangeTo = (newValue) => setValueTo(newValue);



    return (
        <form>
            <button type="button" onClick={handleDialog} disabled={show}>
                検索
            </button>
            {show && createPortal(
                <div className="searchDialog">
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <p>検索条件</p>
                            {/* <Typography component="legend">キーワード</Typography>
                            <TextField
                                id="keyword"
                                value={keyword || ''}
                                onChange={handleKeywordChange}
                            /> */}
                            <Typography component="legend">公開年</Typography>
                            <DemoContainer components={['MobileDatePicker ']}>
                                <DemoItem>
                                    {/* FROM カレンダー */}
                                    <MobileDatePicker
                                        label={'FROM'}
                                        views={['year', 'month', 'day']}
                                        format="YYYY-MM-DD"
                                        openTo="year"
                                        maxDate={currentYear}
                                        minDate={dayjs('1800-01-01')}
                                        yearsOrder="desc"
                                        open={openFrom}
                                        onOpen={() => setOpenFrom(true)}
                                        onClose={() => setOpenFrom(false)}
                                        value={valueFrom}
                                        onChange={handleDateChangeFrom}
                                        slotProps={{
                                            textField: {
                                                InputProps: {
                                                    endAdornment: (
                                                        <>
                                                            {valueFrom && (
                                                                <IconButton onClick={onClearFrom}>
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            )}
                                                            <IconButton onClick={() => setOpenFrom(true)}>
                                                                <CalendarTodayIcon />
                                                            </IconButton>
                                                        </>
                                                    ),
                                                },
                                            },
                                        }}
                                    />

                                    {/* TO カレンダー */}
                                    <MobileDatePicker
                                        label={'TO'}
                                        views={['year', 'month', 'day']}
                                        format="YYYY-MM-DD"
                                        openTo="year"
                                        maxDate={currentYear}
                                        minDate={dayjs('1800-01-01')}
                                        yearsOrder="desc"
                                        open={openTo}
                                        onOpen={() => setOpenTo(true)}
                                        onClose={() => setOpenTo(false)}
                                        value={valueTo}
                                        onChange={handleDateChangeTo}
                                        slotProps={{
                                            textField: {
                                                InputProps: {
                                                    endAdornment: (
                                                        <>
                                                            {valueTo && (
                                                                <IconButton onClick={onClearTo}>
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            )}
                                                            <IconButton onClick={() => setOpenTo(true)}>
                                                                <CalendarTodayIcon />
                                                            </IconButton>
                                                        </>
                                                    ),
                                                },
                                            },
                                        }}
                                    />
                                </DemoItem>
                            </DemoContainer>

                            <Typography component="legend">ジャンル</Typography>
                            <Box sx={{ width: 1000 }}>
                                {searchCriteria.genres.map(genre => (
                                    <FormControlLabel
                                        key={genre.id}
                                        control={
                                            <Checkbox
                                                name={genre.id}
                                                checked={checkboxes[genre.id] || false}
                                                onChange={handleCheckboxChange}
                                            />}
                                        value={genre.value}
                                        label={genre.valueJp}
                                    />
                                ))}
                            </Box>
                            <Typography component="legend">評価</Typography>
                            <Box sx={{ width: 500 }}>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={ratingValue}
                                    min={searchCriteria.rating.min}
                                    max={searchCriteria.rating.max}
                                    step={searchCriteria.rating.step}
                                    onChange={handleRatingChange}
                                    valueLabelDisplay="on"
                                />
                            </Box>
                            <Typography component="legend">投票数</Typography>
                            <Box sx={{ width: 500 }}>
                                <Slider
                                    value={voteValue}
                                    onChange={handleVoteChange}
                                    max={searchCriteria.voteCount.max}
                                    step={searchCriteria.voteCount.step}
                                    marks={searchCriteria.scaleMarks}
                                />
                            </Box>
                            <button type="button" onClick={handleSearchClick}>
                                検索
                            </button>
                            <button type="button" onClick={handleDialog}>
                                閉じる
                            </button>
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>,
                document.getElementById("searchDialog")
            )}
        </form>
    )

}