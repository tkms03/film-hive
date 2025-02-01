import React from 'react';
import './HeaderView.css'

export default function MainView() {
    return (
        <>
        <div className="Title-header">
          <table className="Title-table">
            <tbody>
              <tr className="Title-tr">
                {/* トップページへ遷移 */}
                <th className="title">film-hive</th>
                {/* 映画ページへ遷移 */}
                <th className="column">映画</th>
                {/* テレビ番組ページへ遷移 */}
                <th className="column">テレビ番組</th>
                {/* マイページへ遷移、未ログインの場合、ログインページへ遷移 */}
                <th className="myPage">マイページ</th>
              </tr>
            </tbody>
          </table>
        </div>
        </>
    );
}