import React from 'react';
import ReactDOM from 'react-dom/client';
import DrawingBoard from '@components/DrawingBoard';

const rootDom = document.getElementById('root');
if (rootDom) {
  const root = ReactDOM.createRoot(rootDom);
  root.render(
    <React.StrictMode>
      <DrawingBoard />
    </React.StrictMode>
  );
}
