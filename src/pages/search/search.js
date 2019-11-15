import React, {useState, useEffect} from 'react';
import { Row, Col, Input } from 'antd'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import MovieCatalogo from '../../Components/MovieCatalogo'
import Footer from '../../Components/Footer'
import { URL_API, API } from '../../utils/constants'

import './search.sass'


const Search =  (props) => {
  const {location, history} = props
  const [movieList, setMovieList] = useState([]) 
  const [searchValue, setSeacrhValue] = useState("")

  useEffect(() => {
    (async()=>{
      const searchValue = queryString.parseUrl(location.search)
      const { s } = searchValue.query
      const response = await fetch(
        `${URL_API}/search/movie?api_key=${API}&languaje=es-ES&query=${s}&page=1`
      )
      const movies = await response.json()
      setSeacrhValue(s)
      setMovieList(movies)
    })()
  }, [location.search]);

  const onChangeSeacrh = e => {
    const urlParam = queryString.parse(location.search)
    urlParam.s = e.target.value
    history.push(`?${queryString.stringify(urlParam)}`)
    setSeacrhValue(e.target.value)
  }

return (
  <Row>
    <Col span={12} offset={6} className="search">
      <h1>Busca tu Pelicula</h1>
      <Input value={searchValue} onChange={onChangeSeacrh} />
    </Col>
    {movieList.results && (
      <Row>
        <Col span={24}>
          <MovieCatalogo movies= {movieList} />
        </Col>
      </Row>
    )}
    <Col span={24}>
      <Footer />
    </Col>
  </Row>
)
}

export default withRouter(Search)