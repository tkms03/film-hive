import React, { useState } from 'react';
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


  return (
    <dl>
      {/* SearchDialogコンポーネントを表示し、onSearchにはhandleSearchを渡す */}
      <div id="searchDialog"></div>
      <SearchDialog onSearch={handleSearch} />
      {/* 検索パラメータがあれば表示 */}
      {searchParams && (
        <div>
          <h3>検索条件:</h3>
          <pre>{JSON.stringify(searchParams, null, 2)}</pre>
        </div>
      )}
      <div onClick={() => setActiveComponent('currentlyShowing')}>公開中の映画</div>
      <div onClick={() => setActiveComponent('popularityShowing')}>注目度の高い映画</div>
      <div onClick={() => setActiveComponent('ratingShowing')}>評価の高い映画</div>
    </dl>
  );
}