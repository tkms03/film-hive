import Grid from "@mui/material/Grid";
import './MainApp.css';
import MainView from './features/view/MainView';
import HeaderView from './features/view/HeaderView';

function MainApp() {
    return (
        <Grid container spacing={0} sx={{ width: '100%' }}>
            <Grid
                xs={12}
                sx={{
                    width: '100%',
                    position: 'sticky',
                    top: 0, // スクロール時に上部に固定
                    zIndex: 1100, // ヘッダーが他の要素の上に表示されるように
                    backgroundColor: 'white', // 背景色を設定（必要な場合）
                }}
            >
                <HeaderView />
            </Grid>
            <Grid xs={12} sx={{ width: '100%' }}>
                <MainView />
            </Grid>
        </Grid>
    );
}

export default MainApp;
