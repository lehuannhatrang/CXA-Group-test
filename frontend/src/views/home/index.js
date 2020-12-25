import React, {Component} from 'react';
import sampleData from './sample-data'
import {Col, Container, Row, Card, CardBody, CardHeader, Badge, CardFooter} from "shards-react";
import PageTitle from '../../components/page-title';

class Home extends Component {
    constructor(props) {
        super(props)
        this.renderMovie = this.renderMovie.bind(this)
    }

    renderMovie(movie) {
        return (
            <div className="col-3">
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
                    <CardBody className="p-2">
                        <h5 className="card-title mb-1 text-info pointer" onClick={() => {}}>
                            {movie.title}
                        </h5>
                        <h6 className="text-muted pointer" onClick={() => {}}>
                            <i>{movie.overview}</i>
                        </h6>
                    </CardBody>
                    <CardFooter className="pt-2 pl-2 pr-2">
                        <span className="text-muted">{`Rating: ${movie.voteAverage}/10`}</span>
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
                    {sampleData.map(movie => this.renderMovie(movie))}
                </Row>
                <PageTitle title={'Top'} subtitle={'Movies of the'} />
                <Row>
                    {sampleData.map(movie => this.renderMovie(movie))}
                </Row>
            </div>
        )
    }
}

export default Home;