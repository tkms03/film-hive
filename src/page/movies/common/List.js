import React, { useState } from 'react';
import { useAppContext } from 'context/AppContext';
import Grid from "@mui/material/Grid2";
import Button from '@mui/material/Button';
import './List.css';
import SearchDialog from '../refineSearch/SearchDialog';

export default function List({ setActiveComponent, onSearch }) {

  // ダイアログの開閉状態を表すState(falseで閉じた状態)
  const [show, setShow] = useState(false);
  // 選択中のボタン情報を保持
  const { activeButton, setActiveButton } = useAppContext(); // コンテキストから取得

  // handleSearch 関数を定義
  const handleSearch = (params) => {
    onSearch(params);
  };

  // クリック時の処理
  const handleClick = (componentID) => {
    // コンポーネントを切り替え
    setActiveComponent(componentID);
    // 選択したボタン情報を保持
    setActiveButton(componentID);
  };

  return (
    <dl>
      {/* SearchDialogコンポーネントを表示し、onSearchにはhandleSearchを渡す */}
      <div id="searchDialog"></div>
      <Grid container sx={{ justifyContent: "space-evenly" }} rowSpacing={1}>
        <Grid size={{ sx: 3 }} sx={{ justifyContent: "space-evenly" }}>
          <Button
            color="black"
            onClick={() => setShow(true)}
            variant={'outlined'}
            sx={activeButton === 'searchShowing' ? { backgroundColor: '#000', color: '#FFF' } : {}}
          // disabled={show}
          >
            絞り込み検索
          </Button>
          <SearchDialog
            open={show}
            onClose={() => setShow(false)}
            onSearch={handleSearch}
            activeSearchComponent={() => { handleClick('searchShowing') }}
          />
        </Grid>
        <Grid size={{ sx: 3 }} sx={{ justifyContent: "space-evenly" }}>
          <Button
            color="black"
            variant={'outlined'}
            disabled={true}
          >
            キーワード検索</Button>
        </Grid>
        <Grid size={{ sx: 3 }} sx={{ justifyContent: "space-evenly" }}>
          <Button
            color="black"
            onClick={() => { handleClick('currentlyShowing') }}
            variant={'outlined'}
            sx={activeButton === 'currentlyShowing' ? { backgroundColor: '#000', color: '#FFF' } : {}}>
            公開中の映画（公開後90日間）</Button>
        </Grid>
        <Grid size={{ sx: 3 }} sx={{ justifyContent: "space-evenly" }}>
          <Button
            color="black"
            onClick={() => { handleClick('popularityShowing'); }}
            variant={'outlined'}
            sx={activeButton === 'popularityShowing' ? { backgroundColor: '#000', color: '#FFF' } : {}}>
            注目度の高い映画</Button>
        </Grid>
      </Grid>
    </dl >
  );
}