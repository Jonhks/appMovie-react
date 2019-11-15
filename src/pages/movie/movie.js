import React, {useState} from 'react';
import {Row, Col, Button} from 'antd'
import {useParams} from 'react-router-dom'
import moment from 'moment'
import useFetch from '../../hooks/useFetch'
import {URL_API, API} from '../../utils/constants'
import Loading from '../../Components/Loading'
import ModalVideo from '../../Components/ModalVideo'

import './movie.sass'

export default () => {
  // 'https://api.themoviedb.org/3/movie/475557?api_key=c7e318bc4679faa16a6f940e1435e019&language=es-ES'
  const {id} = useParams()
  const movieInfo = useFetch(
  ` ${URL_API}/movie/${id}?api_key=${API}&language=es-ES`
  )

  if(movieInfo.loading  || !movieInfo.result){
    return <Loading />
  }

  return <RenderMovie movieInfo={movieInfo.result}/>
}


const RenderMovie = props => {
  const {movieInfo: { backdrop_path, poster_path} } = props
  const backdropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`

   return (
    <div className="movie" 
      style={{ backgroundImage:`url("${backdropPath}")` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={11} className="movie__info">
          <MovieInfoComponent movieInfo={props.movieInfo} />
        </Col>
      </Row>
    </div>
  )
}

const PosterMovie = props => {
  const { image } = props
  const posterPath = `https://image.tmdb.org/t/p/original/${image}`
  return <div style={{ backgroundImage: `url("${posterPath}")` }} />
}

const MovieInfoComponent = props => {
  const { movieInfo: {title, id, release_date, overview, genres } } = props
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${API}&languaje=es-ES`
  ) 

  const openModal = () => setIsVisibleModal(true)
  const closeModal = () => setIsVisibleModal(false)

  const renderVideo = () => {
    if(videoMovie.result){
      if(videoMovie.result.results.length > 0){
        return (
          <>
            <Button icon="play-circle" onClick={openModal}>
              Ver Trailer
            </Button>
            <ModalVideo  
              videoKey = {videoMovie.result.results[0].key}
              videoPlatform = {videoMovie.result.results[0].site}
              isOpen = {isVisibleModal}
              close={closeModal}
            /> 
          </>
        )
      }
    }
  }

  return (
    <>
      <div className="movie__info-header">
        <h1>{title}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY") }</span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <h3>General</h3>
          <p>{overview}</p>
        <h3>Generos</h3>
        <ul>
          {genres.map(gen => (
            <li key={gen.id} >{gen.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}