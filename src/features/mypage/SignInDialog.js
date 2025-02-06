import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

export default function SignInDialog({ openSignIn, onCloseSignIn, setShowLogIn }) {

    // 「サインイン」ボタンをクリック
    const handleSignInClick = () => {
        // サインインダイアログを閉じる
        onCloseSignIn();
    }

    // 「キャンセル」ボタンをクリック
    const handleCancelClick = () => {
        // サインインダイアログを閉じる
        onCloseSignIn();
        // ログインダイアログを表示
        setShowLogIn(true);


    }
    return (
        // TODO: サインインページ
        <Dialog
            open={openSignIn}
            onClose={onCloseSignIn}>
            <DialogTitle>サインイン</DialogTitle>
            <DialogContent>
                <div>
                    <TextField label="ユーザID" variant="outlined" margin="normal" />
                </div>
                <div>
                    <TextField label="パスワード(8文字以上)" variant="outlined" margin="normal" type="password" />
                </div>
                <div>
                    <Typography>
                        すでにアカウントをお持ちですか？
                    </Typography>
                    <Typography>
                        →
                        <Typography
                            component="a"
                            onClick={handleCancelClick}
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                        >
                            ログイン
                        </Typography>
                    </Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSignInClick}>
                    サインインして始める
                </Button>
            </DialogActions>
        </Dialog>

    )

}