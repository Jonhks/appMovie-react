import React from 'react';
import { Spin } from 'antd'

import './Loading.sass'


export default () => {
  return (
    <div className="loading"> 
      <Spin size="large"/>
      <p>Cargando...</p>
    </div>
  )
}