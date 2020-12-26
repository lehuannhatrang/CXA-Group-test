import React, {Component} from 'react';
import sampleData from './sample-data'
import {Col, Container, Row, Card, CardBody, CardHeader, Badge, CardFooter} from "shards-react";
import PageTitle from '../../components/page-title';

import {getJson} from "../../../utils";
import { Link } from 'react-router-dom';

const PAGE_SIZE = 4;

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popularVideos: [],
            topRateVideos: [],
            popularPage: PAGE_SIZE,
            topRatePage: PAGE_SIZE,
        }
        this.renderMovie = this.renderMovie.bind(this);
        this.fetchPopularMovies = this.fetchPopularMovies.bind(this);
        this.fetchTopRateMovies = this.fetchTopRateMovies.bind(this);
    }

    async fetchPopularMovies() {
        const popular = await getJson('/movie/popular')
        if(!!popular.movies) this.setState({popularVideos: popular.movies});
    }

    async fetchTopRateMovies() {
        const topRates = await getJson('/movie/top-rates')
        if(!!topRates.movies) this.setState({topRateVideos: topRates.movies});
    }

    handleLoadmorePopular() {
        const newPopularPage = this.state.popularPage + PAGE_SIZE;

        if(newPopularPage <= this.state.popularVideos.length) {
            this.setState({popularPage: newPopularPage})
        } else {
            this.setState({popularPage: this.state.popularVideos.length})
        }
    }

    handleLoadmoreTopRates() {
        const newTopratePage = this.state.topRatePage + PAGE_SIZE;

        if(newTopratePage <= this.state.topRateVideos.length) {
            this.setState({topRatePage: newTopratePage})
        } else {
            this.setState({topRatePage: this.state.topRateVideos.length})
        }
    }

    componentDidMount() {
        this.fetchPopularMovies()
        this.fetchTopRateMovies();
    }

    renderMovie(movie, type) {
        return (
            <div className="col-md-3 col-xs-6" key={`${type}-${movie.id}`} style={styles.movieCard}>
                <Card className="mb-4 mr-2">
                    <CardHeader className='p-0'>
                        <div className="card-post__image pointer height"
                        style={{ 
                            backgroundImage: movie.backdropPath ? `url(${movie.backdropPath})`: `url("https://image.tmdb.org/t/p/w1280/gmL6MSH3jK2T7zYvzo9dIZb393c.jpg")`,
                            height: 300
                        }}
                        onClick={() => {}}
                        >
                            {!!movie.adult && <Badge
                            pill
                            className={`position-absolute bg-warning`}
                            style={{top: "0.9375rem", left: "0.9375rem"}}
                            >
                                Adult
                            </Badge>}
                        </div>
                    </CardHeader>
                    <CardBody className="p-3 pt-4" style={styles.cardBody}>
                        <h5 className="card-title mb-1 text-info pointer" onClick={() => {}}>
                            {movie.title}
                        </h5>
                        <h6 className="text-muted pointer" onClick={() => {}} style={styles.overviewSection}>
                            <i>{movie.overview}</i>
                        </h6>
                    </CardBody>
                    <CardFooter className="pt-4 pl-3 pr-3 justify-content-between">
                        <div className="d-flex justify-content-between">
                            <span>
                                <Badge
                                pill
                                className={`position-absolute bg-info`}
                                style={styles.voteAverage}
                                >
                                    {`${movie.voteAverage} / 10`}
                                </Badge>
                            </span>
                            <span className="text-primary" style={styles.voteAverage}>{`${movie.voteCount} votes`}</span>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    render() {
        return (
            <div className="pt-4">
                <PageTitle title={'Popular'} subtitle={'movies'} />
                <Row>
                    {this.state.popularVideos.slice(0, this.state.popularPage).map(movie => this.renderMovie(movie, 'popular'))}
                </Row>

                {this.state.popularPage < this.state.popularVideos.length && <Row className="justify-content-center">
                    <Link to="#" title='Load more' onClick={() => this.handleLoadmorePopular()}>
                        <h6 style={styles.getMore} className="fa fa-chevron-circle-down"></h6>
                    </Link>
                </Row>}
                
                <PageTitle title={'Rates'} subtitle={'Top'} className="mt-4" />
                <Row>
                    {this.state.topRateVideos.slice(0, this.state.topRatePage).map(movie => this.renderMovie(movie, 'top'))}
                </Row>
                {this.state.topRatePage < this.state.topRateVideos.length && <Row className="justify-content-center">
                    <Link to="#" title='Load more' onClick={() => this.handleLoadmoreTopRates()}>
                        <h6 style={styles.getMore} className="fa fa-chevron-circle-down"></h6>
                    </Link>
                </Row>}
            </div>
        )
    }
}

const styles = {
    movieCard: {
        // height: 600
    },
    cardBody: {
        width: "100%",
        height: 150,
    },
    overviewSection: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: '4',
    },
    voteAverage: {
        fontSize: 15
    },
    getMore: {
        fontSize: 40,
        color: '#bbb8b8',

    }
}

export default Home;