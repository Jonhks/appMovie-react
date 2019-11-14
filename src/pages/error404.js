import React from 'react';
import { Result, Button } from 'antd';
import {Link} from 'react-router-dom'

import '../index.css'

export default () => {
    return <Result 
    className="error404-container"
    status="404" 
    title="404" 
    subTitle="Sorry, the page you visited does not exist."
      extra={ <Link to ="/"> <Button type="primary"> Home</Button></Link>}
    />
}
