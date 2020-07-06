import React from 'react';
import { Layout } from 'antd'
 
import './Footer.sass'

export default () => {
  const { Footer } = Layout
  return (
    <Footer className="footer">
      <p> <span>🎥</span>  Movie App  </p>
    </Footer>
  )
}