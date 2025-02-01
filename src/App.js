import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <div className="Title-header">
      <table className="Title-table">
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
      </table>
    </div>
  );
}

export default App;
