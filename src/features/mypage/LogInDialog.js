import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { userAuth } from "./userAuth";

export default function LogInDialog({ openLogIn, onCloseLogIn, setShowSignIn, setIsLoggedIn }) {

    // 各TextFieldの参照を作成
    const userIDRef = useRef();
    const passwordRef = useRef();

    // 「ログイン」ボタンクリック
    const handleLogInClick = async () => {
        const formData = {
            userID: userIDRef.current.value,
            password: passwordRef.current.value
        }

        // userAuthからログイン結果を取得
        const result = await userAuth(formData);

        // TODO: ログイン認証
        if (result) {
            // ダイアログを閉じる
            onCloseLogIn();
            // 「ログイン」→「マイページ」にボタン切替
            setIsLoggedIn(true);
        } else {
            // TODO:失敗時の処理
        }
    }

    // 「サインイン」ボタンクリック
    const handleSignInClick = () => {
        // ログインダイアログを閉じる
        onCloseLogIn();
        // サインインダイアログを表示
        setShowSignIn(true);
    }

    return (
        <Dialog
            open={openLogIn}
            onClose={onCloseLogIn}>
            <DialogTitle>ログイン</DialogTitle>
            <DialogContent>
                <div>
                    <TextField label="ユーザID" inputRef={userIDRef} variant="outlined" margin="normal" />
                </div>
                <div>
                    <TextField label="パスワード" inputRef={passwordRef} variant="outlined" margin="normal" type="password" />
                </div>
                <div>
                    <Typography >
                        アカウントがない場合は
                        <Typography
                            component="a"
                            onClick={handleSignInClick}
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                        >
                            サインイン
                        </Typography>
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseLogIn}>
                    キャンセル
                </Button>
                <Button onClick={handleLogInClick}>
                    ログイン
                </Button>
            </DialogActions>
        </Dialog>
    )

}