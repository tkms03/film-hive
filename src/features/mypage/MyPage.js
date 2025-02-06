import { Button } from "@mui/material";



export default function MyPage({ setShowMyPage, setIsLoggedIn }) {

    const handleRogOutClick = () => {
        // ログイン状態を解除
        setIsLoggedIn(false);
        // マイページを非表示
        setShowMyPage(false);
    }

    return (
        <>
            <Button
                onClick={handleRogOutClick}>
                ログアウト
            </Button>
        </>
    );

}