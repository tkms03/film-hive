import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { createUser } from "./createUser";

export default function SignInDialog({ openSignIn, onCloseSignIn, setShowLogIn }) {

    // サインインステータスを1つの状態で管理
    const [signInStatus, setSignInStatus] = useState(null);

    // 各TextFieldの参照を作成
    const userNameRef = useRef();
    const userIDRef = useRef();
    const passwordRef = useRef();

    // 「サインイン」ボタンをクリック
    const handleSignInClick = async () => {
        const formData = {
            userName: userNameRef.current.value,
            userID: userIDRef.current.value,
            password: passwordRef.current.value
        }

        // userAuthからサインイン結果を取得
        const result = await createUser(formData)

        if (result) {
            setSignInStatus(true);
        } else {
            setSignInStatus(false);
        }
    }

    // 「キャンセル」ボタンをクリック
    const handleCancelClick = () => {
        setSignInStatus(null); // ステータスリセット
        onCloseSignIn(); // ダイアログを閉じる
        setShowLogIn(true); // ログインダイアログを表示
    };

    // ダイアログを閉じる処理（キャンセルボタンでも共通）
    const handleClose = (event, reason) => {
        if (reason === "backdropClick") {
            setSignInStatus(null); // ダイアログ外クリックでステータスをリセット
        }
        onCloseSignIn(); // ダイアログを閉じる
    };


    return (
        // TODO: サインインページ
        <Dialog
            open={openSignIn}
            onClose={handleClose}>
            <DialogTitle>サインイン</DialogTitle>
            <DialogContent>
                {signInStatus === false &&
                    <Typography color="red">
                        サインインに失敗しました
                    </Typography>
                }
                {signInStatus === true &&
                    <Typography color="red">
                        サインインに成功しました
                    </Typography>
                }
                <div>
                    <TextField label="ユーザネーム" inputRef={userNameRef} variant="outlined" margin="normal" />
                </div>
                <div>
                    <TextField label="ユーザID" inputRef={userIDRef} variant="outlined" margin="normal" />
                </div>
                <div>
                    <TextField label="パスワード(8文字以上)" inputRef={passwordRef} variant="outlined" margin="normal" type="password" />
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