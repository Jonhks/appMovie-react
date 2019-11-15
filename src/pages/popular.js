import React,{useState, useEffect} from 'react';
import { Row, Col } from 'antd'
import {URL_API, API} from '../utils/constants'
import Footer from '../Components/Footer'
import Loading from '../Components/Loading'
import MovieCatalogo from '../Components/MovieCatalogo';
import Pagination from '../Components/Pagination'


export default () => {
  const [movieList, setMovieList] = useState([])
  const [page, setPage] = useState(1)

  useEffect(()=>{
    (async()=>{
      const response = await fetch(
        `${URL_API}/movie/popular?api_key=${API}&languaje=es-ES&page=${page}`
        )
        const movies = await response.json()
        setMovieList(movies)
    })()
  },[page])

  const onChangePage = page => setPage(page)


  return (
    <Row>
      <Col span={24} style={{ textAlign: "center", marginTop:25 }}>
        <h1 style={{fontZise: 35, fontWeigth: "bold"}} >
          Peliculas Populares
        </h1>
      </Col>
      {movieList.results ? (
        <Row>
          <Col span={24}>
            <MovieCatalogo movies={movieList} />
          </Col>
          <Col span={24}>
            <Pagination 
              currentPage={movieList.page}
              totalItems={movieList.total_results}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      ) : (
        <Col span={24}><Loading /></Col>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  )
}