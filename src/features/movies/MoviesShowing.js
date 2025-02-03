
import React from 'react';
import Grid from "@mui/material/Grid2";
import Rating from '@mui/lab/Rating';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { Box } from '@mui/material';
import './MoviesShowing.css';

export default function MoviesShowing({movies}) {

    return (
        <div className="movies-laout">
            <Grid container sx={{ justifyContent: "flex-start" }} spacing={0.5}>
                {movies.map((movie, index) => (
                    <Grid size={{ xs: 6, sm: 3, md: 2, lg: 1.5 }} key={movie.id}>
                        <table className="table-layout">
                            <tbody>
                                <tr>
                                    <td key={index} className="movie-layout">
                                        {/* 1タイトルの情報 */}
                                        <div>
                                            <div className="poster">
                                                {movie.poster ? (
                                                    <img src={`https://image.tmdb.org/t/p/w92${movie.poster}`} alt={movie.title}></img>
                                                ) : (
                                                    <ImageNotSupportedIcon/>
                                                )}
                                            </div>
                                            <div className="info-layout">
                                                <Grid container>
                                                    <Grid size={12}>
                                                        <div className="movie-title">{movie.title}</div>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Box className="votes-layout" display="flex" justifyContent="center">
                                                            <VisibilityIcon
                                                             style={{ fontSize: 20.1,}} />
                                                        </Box>
                                                        <div className="movie-votes">{movie.voteCount}</div>
                                                    </Grid>
                                                    <Grid size={6}>
                                                        <Box className="rating-layout" display="flex" justifyContent="center">
                                                            <Rating
                                                                name="disabled"
                                                                value={movie.vote_average}
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
                                                                value={movie.vote_average - 5}
                                                                size="small"
                                                                precision={0.5}
                                                                icon={<StarIcon
                                                                    sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                                                emptyIcon={<StarIcon
                                                                    sx={{ fontSize: 15, marginRight: "-3px", transform: "translateY(-5px)" }} />}
                                                                readOnly />
                                                        </Box>
                                                        <div className="movie-rating">{movie.vote_average}</div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}