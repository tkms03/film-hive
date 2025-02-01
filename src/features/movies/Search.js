import { useState } from 'react';
import { Slider, TextField, InputAdornment, FormGroup, FormControlLabel, Checkbox, Typography, Box } from '@mui/material'

export default function Search() {
    const [ratingValue, setRatingValue] = useState([0, 10]);
    const [voteValue, setVoteValue] = useState([0, 10]);

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };

    const handleVoteChange = (event, newValue) => {
        setVoteValue(newValue);
    };

    // スライダーの範囲（下限なし, 100, 1000, 10000, 上限なし）
    const marks = [
        { value: 0, label: '0' },
        { value: 100, label: '100' },
        { value: 500, label: '500' },
        { value: 1000, label: '1000' },
        { value: 5000, label: '5000' },
        { value: 10000, label: '10000' },
        { value: 50000, label: '50000' },
        { value: 1000000, label: '上限なし' }, // 最大値は大きな数値で設定
    ];

      // 「下限なし」と「上限なし」を含むマークを均等に表示するためのロジック
  const scaleMarks = [
    { value: 0, label: '0' },
    { value: 1, label: '100' },
    { value: 2, label: '500' },
    { value: 3, label: '1000' },
    { value: 4, label: '5000' },
    { value: 5, label: '10000' },
    { value: 6, label: '50000' },
    { value: 7, label: '上限なし' },
  ];

    return (
        <>

            <Typography component="legend">公開年</Typography>
            <TextField
                size="small"
                type="number"
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">FROM</InputAdornment>,
                    },
                }}
            />
            <TextField
                size="small"
                type="number"
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">TO</InputAdornment>,
                    },
                }}
            />
            {/* <FormGroup> */}
            <Typography component="legend">ジャンル</Typography>
            <Box sx={{ width: 1000 }}>
                <FormControlLabel control={<Checkbox />} label="アクション" id="28" value="Action" />
                <FormControlLabel control={<Checkbox />} label="アドベンチャー" id="12" value="Adventure" />
                <FormControlLabel control={<Checkbox />} label="アニメ" id="16" value="Animation" />
                <FormControlLabel control={<Checkbox />} label="コメディ" id="35" value="Comedy" />
                <FormControlLabel control={<Checkbox />} label="犯罪" id="80" value="Crime" />
                <FormControlLabel control={<Checkbox />} label="ドキュメンタリー" id="99" value="Documentary" />
                <FormControlLabel control={<Checkbox />} label="ドラマ" id="18" value="Drama" />
                <FormControlLabel control={<Checkbox />} label="ファミリー" id="10751" value="Family" />
                <FormControlLabel control={<Checkbox />} label="ファンタジー" id="14" value="Fantasy" />
                <FormControlLabel control={<Checkbox />} label="歴史" id="36" value="History" />
                <FormControlLabel control={<Checkbox />} label="ホラー" id="27" value="Horror" />
                <FormControlLabel control={<Checkbox />} label="音楽" id="10402" value="Music" />
                <FormControlLabel control={<Checkbox />} label="ミステリー" id="9648" value="Mystery" />
                <FormControlLabel control={<Checkbox />} label="ロマンス" id="10749" value="Romance" />
                <FormControlLabel control={<Checkbox />} label="サイエンスフィクション" id="878" value="Science Fiction" />
                <FormControlLabel control={<Checkbox />} label="テレビ映画" id="10770" value="TV Movie" />
                <FormControlLabel control={<Checkbox />} label="スリラー" id="53" value="Thriller" />
                <FormControlLabel control={<Checkbox />} label="戦争" id="10752" value="War" />
                <FormControlLabel control={<Checkbox />} label="西部劇" id="37" value="Western" />
            </Box>
            {/* </FormGroup> */}
            <Typography component="legend">評価</Typography>
            <Box sx={{ width: 500 }}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={ratingValue}
                    min={0}
                    max={10}
                    step={0.1}
                    onChange={handleRatingChange}
                    valueLabelDisplay="on"
                />
            </Box>
            <Typography component="legend">投票数</Typography>
            <Box sx={{ width: 500 }}>
                <Slider
                    value={voteValue}
                    onChange={handleVoteChange}
                    max={7} // 「100」〜「50000」間を均等に分ける
                    step={1} // 値を1単位で増減
                    marks={scaleMarks} // マークを均等に配置
                    valueLabelFormat={(value) => {
                      if (value === 7) return '上限なし';
                      return value === 0 ? '0' 
                      : value === 1 ? '100' 
                      : value === 2 ? '500' 
                      : value === 3 ? '1000' 
                      : value === 4 ? '5000' 
                      : value === 5 ? '10000' 
                      : value === 6 ? '50000' : '';
                    }}
                />
            </Box>
        </>
    )
}