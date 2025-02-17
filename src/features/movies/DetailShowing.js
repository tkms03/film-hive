
import Grid from "@mui/material/Grid";

// 詳細情報を受け取る
export default function DetailShowing() {

    return (
        <Grid container spacing={2}>
            {/* タイトル、公開日 */}
            <Grid item></Grid>
            {/* 原題 */}
            <Grid item></Grid>
            {/* 時間、ジャンル */}
            <Grid item></Grid>
            {/* ポスター */}
            <Grid item xs={4}></Grid>
            {/* 詳細情報 */}
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    {/* ボタン（レビュー、お気に入り、ウォッチリスト、HP */}
                    <Grid item xs={12}></Grid>
                    {/* キャスト */}
                    <Grid item xs={12}></Grid>
                    {/* あらすじ */}
                    <Grid item xs={12}></Grid>
                    {/* 予算、収益 */}
                    <Grid item xs={12}></Grid>
                    {/* おすすめ */}
                    <Grid item xs={12}></Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}