import React, {Component} from 'react';
import {Col, Container, Row, Card, CardBody, CardHeader, Badge, CardFooter} from "shards-react";
import PageTitle from '../../components/page-title';

import {getJson} from "../../../utils";
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

const PAGE_SIZE = 20;

class MovieDetails extends Component {
    constructor(props) {
        super(props)
        const movieId = props.match.params.movieId;
        this.state = {
            movieId,
            movieDetails: ''
        }
        this.fetchDetails = this.fetchDetails.bind(this);
    }

    async fetchDetails() {
        const {movieId} = this.state;
        try {
            const movieDetails = await getJson('/movie/details', {movieId})
            if(!!movieDetails.result) {
                this.setState({
                    movieDetails: movieDetails.result
                })
            }
        } catch(e) {
            this.props.history.push('/404')
        }
    }

    
    componentDidMount() {
        this.fetchDetails();
    }

    componentWillReceiveProps(nextProps) {

    }


    render() {
        const { movieDetails } = this.state;
        if(!movieDetails) return <Loading/>
        return (
            <div className="pt-4">
                <PageTitle title={'Details'} subtitle={'movie'} />
                <Row className="pl-2">
                    <div className="col-md-4 col-xs-12">
                        {/* Backdrop section */}
                        <img className="col-12 mb-4" src={movieDetails.posterPath} style={styles.backdropImage}/>
                    </div>
                    <div className="col-md-7 col-xs-12">
                        <h3>{`${movieDetails.title} (${(new Date(movieDetails.releaseDate)).getFullYear() })`}</h3>

                        <h6 className="text-muted">
                            <Badge
                            pill
                            className={`bg-info`}
                            style={{}}
                            >
                                {movieDetails.status}
                            </Badge>
                        </h6>
                        <h6 className="text-info">{movieDetails.tagline}</h6>

                        <div style={{fontSize: 20}}>
                            <i className="fa fa-star mr-2" style={styles.starIcon}/>
                            <span>{`${movieDetails.voteAverage} / 10 (${movieDetails.voteCount} votes)`}</span>
                        </div>

                        <h4 className="mt-3 text-bold">Overview</h4>

                        <p className="p-4" style={styles.overviewSection}>{movieDetails.overview}</p>


                        <h5 className="mt-3 text">{`Released Date: ${movieDetails.releaseDate}`}</h5>

                    </div>
                </Row>
            </div>
        )
    }
}

const styles = {
    backdropImage: {
        height: 'auto',
    },
    starIcon: {
        // color: 'yellow',
    },
    overviewSection: {
        fontSize: 15,
    }
}

export default MovieDetails;