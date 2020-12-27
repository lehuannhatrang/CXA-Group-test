import React, {Component} from 'react';
import {Col, Container, Row, Card, CardBody, CardHeader, Badge, CardFooter} from "shards-react";
import PageTitle from '../../components/page-title';

import {getJson} from "../../../utils";
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

const PAGE_SIZE = 20;

class Search extends Component {
    constructor(props) {
        super(props)
        const keyword = props.match.params.keyword;
        this.state = {
            page: PAGE_SIZE,
            searchMovies: [],
            keyword: keyword || '',
            totalResults: 0,
            pageIndex: 1,
            loading: false
        }
    }

    async fetchsearchMovies() {
        await this.setState({loading: true});
        const search = await getJson('/movie/search', {keyword: this.state.keyword, pageIndex: 1});
        if(!!search.movies) {
            this.setState({
                searchMovies: search.movies,
                totalResults: search.totalResults,
                page: PAGE_SIZE,
                pageIndex: 1,
                loading: false
            });
        }
    }
    
    navigateToDetails(movideId) {
        if(!!movideId) this.props.history.push(`/movie/${movideId}`)
    }

    async fetchMoreData() {
        const { pageIndex, searchMovies } = this.state;
        const search = await getJson('/movie/search', {keyword: this.state.keyword, pageIndex: pageIndex + 1});
        if(!!search.movies) {
            this.setState({
                searchMovies: [
                    ...searchMovies,
                    ...search.movies
                ],
                pageIndex: pageIndex + 1,
            });
            return search.movies.length
        }
    }


    async handleLoadmore() {
        const moreDataLength = await this.fetchMoreData();

        const newPage = this.state.page + moreDataLength;
        if(newPage <= this.state.totalResults) {
            this.setState({page: newPage})
        } else {
            this.setState({page: this.state.totalResults})
        }
    }

    componentDidMount() {
        this.fetchsearchMovies()
    }

    componentWillReceiveProps(nextProps) {
        const newKeyword = nextProps.match.params.keyword;
        if(newKeyword !== this.state.keyword) {
            this.setState({keyword: newKeyword}, (e) => {
                this.fetchsearchMovies()
            })
            
        }
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
                        onClick={() => this.navigateToDetails(movie.id)}
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
                        <h5 className="card-title mb-1 text-info pointer" onClick={() => this.navigateToDetails(movie.id)}>
                            {movie.title}
                        </h5>
                        <h6 className="text-muted" onClick={() => {}} style={styles.overviewSection}>
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
        const { searchMovies, page, keyword, totalResults, loading } = this.state;
        return (
            <div className="pt-4">
                <PageTitle title={'Search'} subtitle={'movies'} />
                <h6 className="mr-2" style={styles.totalNumberResults}>
                    <span>
                        {`${totalResults} movies was founded with keyword "${keyword}"`}
                    </span>
                </h6>
                {!!loading && <Loading /> }
                {!loading && 
                    <Row>
                        {searchMovies.slice(0, page).map(movie => this.renderMovie(movie, 'search'))}
                    </Row>
                }

                {page < totalResults && !loading && <Row className="justify-content-center">
                    <Link to="#" title='Load more' onClick={() => this.handleLoadmore()}>
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
    totalNumberResults: {
        textAlign: 'right'
    },
    voteAverage: {
        fontSize: 15
    },
    getMore: {
        fontSize: 40,
        color: '#bbb8b8',

    }
}

export default Search;