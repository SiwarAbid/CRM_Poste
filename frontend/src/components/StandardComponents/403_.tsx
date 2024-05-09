import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary"><a href='/'>Back Home</a></Button>}
  />
);

export default App;