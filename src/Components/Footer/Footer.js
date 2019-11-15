import React from 'react';
import { Layout } from 'antd'
 
import './Footer.sass'

export default () => {
  const { Footer } = Layout
  return (
    <Footer className="footer">
      <p>🎥 Movie App  </p>
    </Footer>
  )
}