import React from 'react';
import ReactDOM from 'react-dom';

import store from './frontend/store/store'

import Root from './frontend/components/root'






window.addEventListener('DOMContentLoaded', (e) => {
 const root = document.getElementById('root');
 window.store = store;


ReactDOM.render(<Root store={store}/>,root)










})