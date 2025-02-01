import Grid from '@mui/material/Grid'
import './MainApp.css';
import MainView from './features/view/MainView';
import HeaderView from './features/view/HeaderView';

function MainApp() {
    return (
        <Grid container spacing={0}>
            <Grid xs={12}>
                <HeaderView />
            </Grid>
            <Grid xs={12}>
                <MainView />
            </Grid>
        </Grid>
    );
}

export default MainApp;
