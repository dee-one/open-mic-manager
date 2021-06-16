import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import App from './app';
import ActionCable from 'actioncable';






const CableApp = {};
CableApp.cable = ActionCable.createConsumer('ws://localhost:3000/cable');
export const ActionCableContext = createContext();

const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
        <ActionCableContext.Provider value={CableApp.cable}>
               <App />
        </ActionCableContext.Provider>
        </HashRouter>
    </Provider>


);

export default Root;