import React from 'react';
import ReactDOM from 'react-dom';
import ChartEntrySong from './ChartEntrySong';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChartEntrySong />, div);
  ReactDOM.unmountComponentAtNode(div);
});
