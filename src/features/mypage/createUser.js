import config from '../config.json'

export async function createUser(formData) {

    const userData = {
        user_name: formData.userName,
        user_id: formData.userID,
        password: formData.password
    };

    // サーバーのエンドポイントURL
    // 開発環境
    // const environment = "development";
    // 本番環境
    const environment = "production";
    const envConfig = config.environments[environment];

    // ベースURL + エンドポイントを組み立てる関数
    const getEndpointUrl = (endpointKey) => {
        return envConfig.base_url + config.endpoints[endpointKey];
    };

    // "createUser" エンドポイントのURLを取得
    const URL = getEndpointUrl("createUser");

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // レスポンスの確認
        if (response.ok) {
            return true;
        } else {
            console.error("Error in user creation:", response);
            return false;
        }

    } catch (error) {
        console.error('Error fetching movies:', error);
        return false;
    }
}