import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import './index.scss';
import App from './App';
import {store} from "./store";
import text_uk from "./translations/uk/text.json";
import text_en from "./translations/en/text.json";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";

i18next.init({
  interpolation: {escapeValue: false},
  lng: 'en',
  resources: {
    en: {
      text: text_en
    },
    uk: {
      text: text_uk
    },
  },
}).then(r => {});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HashRouter>
      <I18nextProvider i18n={i18next}>
        <App/>
      </I18nextProvider>
    </HashRouter>
  </Provider>
);
