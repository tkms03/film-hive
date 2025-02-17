// import config from '../config.json';

// /**
//  * ユーザー認証を行う関数
//  * @param {string} userID - ユーザーID
//  * @param {string} password - パスワード
//  * @returns
//  */
// export async function loginUser(userID, password) {

//     // サーバーのエンドポイントURL
//     // 開発環境
//     // const environment = "development";
//     // 本番環境
//     const environment = "production";
//     const envConfig = config.environments[environment];

//     // ベースURL + APIパス + エンドポイントを組み立てる関数
//     const getEndpointUrl = (endpointKey) => {
//         return envConfig.base_url + envConfig.api_prefix + config.endpoints[endpointKey];
//     };

//     // "signIn" エンドポイントのURLを取得
//     const API_URL = getEndpointUrl("logIn");

//     // データを取得する関数
//     try {
//         // DB検索パラメータ
//         const params = {
//             user_id: userID,  // ユーザID
//             password: password,  //パスワード
//         };

//         // 実行
//         const response = await fetch(API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(params),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//     } catch (error) {
//         console.error('Error fetching movies:', error);
//     }

// }