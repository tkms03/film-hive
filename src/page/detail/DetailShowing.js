
import Grid from "@mui/material/Grid";
import { Typography, Box, Link } from "@mui/material";
import { Rating } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { useNavigate } from 'react-router-dom';
import 'page/detail/DetailShowing.css'

export default function DetailShowing({ detailData }) {

    const navigate = useNavigate(); // useNavigateを使用してページ遷移を管理

    // 日付フォーマット（YYYY）
    function getYear(value) {
        const date = new Date(value);
        return date.getFullYear();
    }

    // 日付フォーマット（YYYY年MM月DD日）
    function formatYearMonthDay(value) {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateText = year + "年" + month + "月" + day + "日"
        return dateText;
    }

    // 映画クリック時処理
    const handleClick = (id) => {
        // ページ遷移
        navigate(`/detailShowing/${id}`);
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <>
            {/* 12:タイトル、公開日*/}
            <Typography textAlign="center">
                <Box component="span" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {detailData.details.title}
                </Box>{' '}
                <Box component="span" sx={{ fontSize: '13px' }}>
                    ({getYear(detailData.details.release_date)})
                </Box>{' '}
            </Typography>
            {/* {/* 12:原題/} */}
            <Typography textAlign="center" sx={{ fontSize: '13px', color: 'gray' }}>
                原題：{detailData.details.original_title}
            </Typography>
            {/* 12:コンテナ */}
            < Grid container rowSpacing={2} alignItems="center">
                < Grid item xs={4} sm={4} md={4} lg={4} xl={5} align="center">
                    < Grid container rowSpacing={2} alignItems="center">
                        {/*   3:ポスター */}
                        < Grid item xs={12}>
                            {detailData.details.poster_path ? (
                                <Box
                                    component="img"
                                    src={`https://image.tmdb.org/t/p/w500${detailData.details.poster_path}`}
                                    className="poster-image"
                                    sx={{
                                        minHeight: { xs: '210px', sm: '210px', md: '320px', lg: '420px', xl: '420px' }
                                    }}
                                />
                            ) : (
                                <ImageNotSupportedIcon className="poster-image"
                                    sx={{
                                        minHeight: { xs: '210px', sm: '210px', md: '320px', lg: '420px', xl: '420px' }
                                    }} />
                            )}
                        </Grid>
                        {/*     12:評価数、評価 */}
                        <Grid item xs={6}>
                            <Box className="votes-layout" display="flex" justifyContent="center">
                                <VisibilityIcon
                                    style={{ fontSize: 20.1, }} />
                            </Box>
                            <div className="movie-votes">{detailData.details.vote_count}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <Box className="rating-layout" display="flex" justifyContent="center">
                                <Rating
                                    name="disabled"
                                    value={detailData.details.vote_average}
                                    size="small"
                                    precision={0.5}
                                    icon={<StarIcon
                                        sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                    emptyIcon={<StarIcon
                                        sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                    readOnly />
                            </Box>
                            <Box className="rating-layout" display="flex" justifyContent="center">
                                <Rating
                                    name="disabled"
                                    value={detailData.details.vote_average - 5}
                                    size="small"
                                    precision={0.5}
                                    icon={<StarIcon
                                        sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                    emptyIcon={<StarIcon
                                        sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                    readOnly />
                            </Box>
                            <div className="movie-rating">{detailData.details.vote_average}</div>
                        </Grid>
                    </Grid >
                </Grid >
                {/*   9:コンテナ */}
                < Grid item xs={8} sm={8} md={8} lg={8} xl={7} >
                    {/* 12:上映日、時間、元の言語、製造会社、生産国 */}
                    <Typography sx={{ fontSize: '13px' }}>
                        上映日：{formatYearMonthDay(detailData.details.release_date)}
                    </Typography>
                    <Typography sx={{ fontSize: '13px' }}>
                        上映時間：{detailData.details.runtime}min
                    </Typography>
                    <Typography sx={{ fontSize: '13px' }}>
                        言語：{detailData.details.original_language}
                    </Typography>
                    <Typography sx={{ fontSize: '13px' }}>
                        製作国：{detailData.details.production_countries.map((country) => (country.name)).join(',')}
                    </Typography>
                    <Typography sx={{ fontSize: '13px' }}>
                        配給会社：{detailData.details.production_companies.map((company) => (company.name)).join(',')}
                    </Typography>
                    {/* 12:ジャンル */}
                    <Typography sx={{ fontSize: '13px' }}>
                        ジャンル：{detailData.details.genres.map((genre) => (genre.name)).join(',')}
                    </Typography>
                    <Grid container rowSpacing={2}>
                        {/*     12:ボタン、HP */}
                        <Grid item xs={12}>
                            <IconButton
                                sx={{
                                    color: "#f73378",
                                    // backgroundColor: '#eeeeee'
                                }}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: "#26a69a",
                                    // backgroundColor: '#eeeeee'
                                }}>
                                <BookmarkAddIcon />
                            </IconButton>
                            <Link href={detailData.details.homepage} target="_blank">
                                <IconButton
                                    sx={{
                                        color: "#0091ea",
                                        // backgroundColor: '#eeeeee'
                                    }}
                                >
                                    <HomeIcon />
                                </IconButton>
                            </Link>
                            {/* <Typography>{detailData.details.homepage}</Typography> */}
                        </Grid>
                        {/*     12:あらすじ */}
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '13px' }}>{detailData.details.overview}</Typography>
                        </Grid>
                        {/*     12:予算、収益 */}
                        <Grid item xs={12}></Grid>
                    </Grid>
                </Grid >
            </Grid >
            <Grid container rowSpacing={2}>
                {/* 12:キャスト、スタッフ */}
                <Grid item xs={12}>
                    <Typography>キャスト</Typography>
                </Grid>
                {detailData.credits.cast.map((cast, index) => (
                    <Grid item xs={3} sm={2.4} md={1.5} lg={1.2} xl={1.2} padding={2}>
                        <div cast_id={cast.cast_id} id={cast.id}>
                            {cast.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                                    className="cast-image"
                                />
                            ) : (
                                <ImageNotSupportedIcon className="cast-image" />
                            )}
                            <Typography sx={{ fontSize: '12px' }}>{cast.name}</Typography>
                            <Typography sx={{ fontSize: '11px', color: 'gray' }}>{cast.character}</Typography>
                        </div>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Typography>クルー</Typography>
                </Grid>
                {detailData.credits.crew.map((crew, index) => (
                    <Grid item xs={1.5} sm={1} md={0.75} lg={0.6} xl={0.5} padding={0.5}>
                        <div credit_id={crew.credit_id} id={crew.id}>
                            {crew.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
                                    className="crew-image"
                                />
                            ) : (
                                <ImageNotSupportedIcon className="crew-image" />
                            )}
                            <Typography sx={{ fontSize: '10px' }}>{crew.name}</Typography>
                            <Typography sx={{ fontSize: '9px', color: 'gray' }}>{crew.job}</Typography>
                        </div>
                    </Grid>
                ))}
            </Grid>
            {/* 12*おすすめ   */}
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <Typography>おすすめ</Typography>
                </Grid>
                {detailData.recommendations.results.map((result, index) => (
                    <Grid item xs={3} sm={2.4} md={1.5} lg={1.2} xl={1.2} padding={2}>
                        <div
                            id={result.id}
                            onClick={() => handleClick(result.id)}
                        >
                            {result.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                    className="recommendations-poster-image"
                                />
                            ) : (
                                <ImageNotSupportedIcon className="recommendations-poster-image" />
                            )}
                            <Typography sx={{ fontSize: '12px' }}>{result.title}</Typography>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </>


        // </DetailShowing >
    );
}