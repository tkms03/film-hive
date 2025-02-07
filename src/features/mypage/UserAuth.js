export async function UserAuth(formData) {

    const userData = {
        login_id: formData.userID,
        password: formData.password
    };

    const url = "http://127.0.0.1:5000/auth/login"

    try {
        const response = await fetch(url, {
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