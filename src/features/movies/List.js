import React, { useState } from 'react';
import Grid from "@mui/material/Grid2";
import Button from '@mui/material/Button';
import './List.css';
import SearchDialog from './SearchDialog';

export default function List({ setActiveComponent, onSearch }) {

  // 検索パラメータを管理するためのstateを追加
  const [searchParams, setSearchParams] = useState(null);

  // handleSearch 関数を定義
  const handleSearch = (params, shouldSwitch) => {
    console.log("検索パラメータ:", params);
    if (shouldSwitch) {
      setActiveComponent('searchShowing');  // 🔥 ここで画面を切り替え
    }
    onSearch(params);
  };

  function onClickList(){

  }


  return (
    <dl>
      {/* SearchDialogコンポーネントを表示し、onSearchにはhandleSearchを渡す */}
      <div id="searchDialog"></div>
      <Grid container sx={{ justifyContent: "space-evenly" }}>
        <Grid size={{ sx: 3 }} sx={{ justifyContent: "space-evenly" }}>
          <SearchDialog onSearch={handleSearch} />
          {/* 検索パラメータがあれば表示 */}
          {searchParams && (
            <div>
              <h3>検索条件:</h3>
              <pre>{JSON.stringify(searchParams, null, 2)}</pre>
            </div>
          )}
        </Grid>
        <Grid size={{ sx: 3 }} sx={{ justifyContent: "space-evenly" }}>
          <Button color="black" onClick={(className) => {setActiveComponent('currentlyShowing'); onClickList(className);}} className="currently-list">公開中の映画</Button>
        </Grid>
        <Grid size={{ sx: 3 }} sx={{ justifyContent: "space-evenly" }}>
          <Button color="black" onClick={(className) => {setActiveComponent('popularityShowing'); onClickList(className);}} className="popularity-list">注目度の高い映画</Button>
        </Grid>
        <Grid size={{ sx: 3 }} sx={{ justifyContent: "space-evenly" }} className="rating-list">
          <Button color="black" onClick={(className) => {setActiveComponent('ratingShowing'); onClickList(className);}}>評価の高い映画</Button>
        </Grid>
      </Grid>
    </dl>
  );
}