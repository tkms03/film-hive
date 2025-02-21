import { Button } from "@mui/material";
import { useLocation } from 'react-router-dom';



export default function MyPage({ setShowMyPage, setIsLoggedIn }) {
    
    const location = useLocation();

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