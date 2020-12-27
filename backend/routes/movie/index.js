import express from 'express';
import {CommonConfig, IndexConfig} from '../../configs';
import HttpUtil from "../../utils/HttpUtil";
import { Error } from '../../errors/Error';

const videoRoute = express.Router();

const movieDbApiCOnfig = IndexConfig.MOVIE_DB_API

videoRoute.get('/popular', async (req, res) => {
    console.log('ok')
    const query = {
        api_key: movieDbApiCOnfig.api_key
    }
    const popularMovies = await HttpUtil.getJson(`${movieDbApiCOnfig.url}/movie/popular`, query);

    if(!popularMovies.results) return HttpUtil.makeErrorResponse(res, 500)

    const movies = popularMovies.results.map(movie => ({
        adult: movie.adult,
        backdropPath: `${IndexConfig.IMAGE_CLOUD_STORAGE_URI}${movie.backdrop_path}`,
        id: movie.id,
        overview: movie.overview,
        title: movie.title,
        popularity: movie.popularity,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        posterPath: `${IndexConfig.IMAGE_CLOUD_STORAGE_URI}${movie.poster_path}`
    }))

    HttpUtil.makeJsonResponse(res, {movies})
})

videoRoute.get('/top-rates', async (req, res) => {
    const query = {
        api_key: movieDbApiCOnfig.api_key
    }
    const popularMovies = await HttpUtil.getJson(`${movieDbApiCOnfig.url}/movie/top_rated`, query);

    if(!popularMovies.results) return HttpUtil.makeErrorResponse(res, 500)

    const movies = popularMovies.results.map(movie => ({
        adult: movie.adult,
        backdropPath: `${IndexConfig.IMAGE_CLOUD_STORAGE_URI}${movie.backdrop_path}`,
        id: movie.id,
        overview: movie.overview,
        title: movie.title,
        popularity: movie.popularity,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        posterPath: `${IndexConfig.IMAGE_CLOUD_STORAGE_URI}${movie.poster_path}`
    }))

    HttpUtil.makeJsonResponse(res, {movies})
})

videoRoute.get('/search', async (req, res) => {
    const keyword = req.query.keyword;

    const page = req.query.pageIndex || 1;

    if(!keyword) return HttpUtil.makeErrorResponse(res, Error.ITEM_NOT_FOUND)
    const query = {
        api_key: movieDbApiCOnfig.api_key,
        query: keyword,
        page
    }
    const popularMovies = await HttpUtil.getJson(`${movieDbApiCOnfig.url}/search/movie`, query);

    if(!popularMovies.results) return HttpUtil.makeErrorResponse(res, 500)
    const movies = popularMovies.results.map(movie => ({
        adult: movie.adult,
        backdropPath: !!movie.backdrop_path ? `${IndexConfig.IMAGE_CLOUD_STORAGE_URI}${movie.backdrop_path}` : IndexConfig.EMPTY_IMAGE_URL,
        id: movie.id,
        overview: movie.overview,
        title: movie.title,
        popularity: movie.popularity,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        posterPath: !!movie.poster_path ? `${IndexConfig.IMAGE_CLOUD_STORAGE_URI}${movie.poster_path}` : IndexConfig.EMPTY_IMAGE_URL
    }))

    HttpUtil.makeJsonResponse(res, {movies, totalResults: popularMovies.total_results})
})

export default videoRoute;