import React from 'react';
import { Col, Card, Icon } from 'antd'
import { Link } from 'react-router-dom'

import './MovieCatalogo.sass'

export default (props) => {
  const { movies:{ results } } = props

  return results.map(movie=>(
    <Col key={movie.id} xs={4} className="movie-catalogo">
      <MovieCard movie={movie} />
    </Col>
  ))
}


const MovieCard = (props) => {
  const { movie: { id, title, poster_path } } = props
  const { Meta } = Card
  const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`

  return (
  <Link to= {`/movie/${id}`} >
    <Card
      hoverable
      style={{ width: 230 }}
      cover={ <img alt={title} src={posterPath } /> }
      actions={[ <Icon type="eye"  key="eye"/> ]}
    >
      <Meta title={title} />
    </Card>
  </Link>
  )
}