import React from 'react';
import ReactDOM from 'react-dom/client';
import Workspace from '@/pages/PlaySpace';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { ConfigProvider } from 'antd';

const rootDom = document.getElementById('root');
if (rootDom) {
  const root = ReactDOM.createRoot(rootDom);
  root.render(
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.normal.main,
          },
        }}
      >
        <Workspace />
      </ConfigProvider>
    </ThemeProvider>
  );
}
