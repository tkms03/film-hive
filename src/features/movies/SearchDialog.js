import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import ja from 'date-fns/locale/ja'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Slider, TextField, toolbar, FormControlLabel, Checkbox, Typography, Box } from '@mui/material'
import './SearchDialog.css'
import searchCriteria from './searchCriteria.json';  // JSONをインポート

export default function SearchDialog({
    open,
    onSearch,
    onClose,
    setActiveButton,
    activeSearchComponent }) {

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
                    from: dayjs.isDayjs(valueFrom) ? valueFrom.toDate().toLocaleDateString(
                        "ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }).replaceAll('/', '-') : '',
                    to: dayjs.isDayjs(valueTo) ? valueTo.toDate().toLocaleDateString(
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

        // ここで activeSearchComponent を呼び出して searchShowing に設定
        activeSearchComponent;
        setActiveButton('searchShowing');
        onClose();
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

    // 日付を選択したときのハンドラー
    const handleDateChangeFrom = (newValue) => setValueFrom(newValue);
    const handleDateChangeTo = (newValue) => setValueTo(newValue);

    return (
        <Dialog
            open={open}
            onClose={onclose}
        >
            <DialogTitle id="alert-dialog-title">
                {"検索条件"}
            </DialogTitle>
            <DialogContent>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ja}
                    dateFormats={{ dayOfMonthFull: 'yyyy年 MM月 dd日' }}
                >
                    <Grid container rowSpacing={1} sx={{ width: '100%' }}>
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <Typography component="legend" sx={{ width: '100%', fontSize: '14px', color: 'white', backgroundColor: '#454545' }}>
                                公開年
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <Grid container spacing={2} sx={{ width: '100%' , justifyContent: 'center'}}>
                                <Grid item xs={6}>
                                    <MobileDatePicker
                                        label={'FROM'}
                                        views={['year', 'month', 'day']}
                                        format="yyyy年MM月dd日"
                                        openTo="year"
                                        yearsOrder="desc"
                                        open={openFrom}
                                        onOpen={() => setOpenFrom(true)}
                                        onClose={() => setOpenFrom(false)}
                                        value={valueFrom}
                                        onChange={handleDateChangeFrom}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                sx: {
                                                    width: '95%', // 横幅を変更
                                                    '& .MuiInputBase-root': {
                                                        fontSize: '13px', // 文字のサイズを変更
                                                        padding: '1px', // 内側の余白を調整
                                                    },
                                                },
                                                InputProps: {
                                                    endAdornment: (
                                                        <IconButton onClick={() => setOpenFrom(true)}>
                                                            <CalendarTodayIcon />
                                                        </IconButton>
                                                    ),
                                                },
                                            },
                                            toolbar: {
                                                hidden: true,
                                            },
                                            actionBar: {
                                                actions: ['cancel', 'clear', 'today', 'accept'],
                                                sx: {
                                                    "& .MuiButton-root": {
                                                        fontSize: "12px",
                                                        minWidth: "75px",
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <MobileDatePicker
                                        label={'TO'}
                                        views={['year', 'month', 'day']}
                                        format="yyyy年MM月dd日"
                                        openTo="year"
                                        yearsOrder="desc"
                                        open={openTo}
                                        onOpen={() => setOpenTo(true)}
                                        onClose={() => setOpenTo(false)}
                                        value={valueTo}
                                        onChange={handleDateChangeTo}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                sx: {
                                                    width: '95%',
                                                    '& .MuiInputBase-root': {
                                                        fontSize: '12px',
                                                        padding: '1px',
                                                    },
                                                },
                                                InputProps: {
                                                    endAdornment: (
                                                        <IconButton onClick={() => setOpenTo(true)}>
                                                            <CalendarTodayIcon />
                                                        </IconButton>
                                                    ),
                                                },
                                            },
                                            toolbar: {
                                                hidden: true,
                                            },
                                            actionBar: {
                                                actions: ['cancel', 'clear', 'today', 'accept'],
                                                sx: {
                                                    "& .MuiButton-root": {
                                                        fontSize: "12px",
                                                        minWidth: "75px",
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <Grid container rowSpacing={0.5} sx={{ width: '100%' }}>
                                <Grid item xs={12} sx={{ width: '100%' }}>
                                    <Typography component="legend" sx={{ width: '100%', fontSize: '14px', color: 'white', backgroundColor: '#454545' }}>
                                        ジャンル
                                    </Typography>
                                </Grid>
                                <Grid container rowSpacing={0} columnSpacing={3} sx={{ width: '90%' , paddingX: '5%'}}>
                                    {searchCriteria.genres.map(genre => (
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                key={genre.id}
                                                control={
                                                    <Checkbox
                                                        name={genre.id}
                                                        checked={checkboxes[genre.id] || false}
                                                        onChange={handleCheckboxChange}
                                                        sx={{ transform: "scale(0.7)", padding: "0px" }} // チェックボックスを小さくする
                                                    />}
                                                value={genre.value}
                                                label={genre.valueJp}
                                                sx={{ margin: "0", fontSize: "10px", gap: "0px" }} // ラベルの余白をなくす
                                                size="small"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* </Box> */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <Grid container rowSpacing={3.5} sx={{ width: '100%' }}>
                                <Grid item xs={12} sx={{ width: '100%' }}>
                                    <Typography component="legend" sx={{ width: '100%', fontSize: '14px', color: 'white', backgroundColor: '#454545' }}>
                                        評価
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={ratingValue}
                                        min={searchCriteria.rating.min}
                                        max={searchCriteria.rating.max}
                                        step={searchCriteria.rating.step}
                                        onChange={handleRatingChange}
                                        valueLabelDisplay="on"
                                        sx={{
                                            width: '90%',
                                        }}
                                        size="small"
                                        aria-label="Small"
                                        color="black"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <Grid container rowSpacing={0} sx={{ width: '100%' }}>
                                <Grid item xs={12} sx={{ width: '100%', backgroundColor: '#454545' }}>
                                    <Typography component="legend" sx={{ width: '100px', fontSize: '14px', color: 'white', backgroundColor: '#454545' }}>
                                        投票数
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Slider
                                        value={voteValue}
                                        onChange={handleVoteChange}
                                        max={searchCriteria.voteCount.max}
                                        step={searchCriteria.voteCount.step}
                                        marks={searchCriteria.scaleMarks}
                                        sx={{
                                            width: '90%',
                                            '& .MuiSlider-markLabel': {
                                                fontSize: '10px', // フォントサイズ変更
                                            },
                                        }}
                                        size="small"
                                        color="black"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            </DialogContent >
            <DialogActions>
                <Button type="button" onClick={handleSearchClick}>
                    検索
                </Button>
                <Button type="button" onClick={onClose}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog >
    )

}