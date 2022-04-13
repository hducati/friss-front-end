import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

createServer({
  models: {
    formula: Model
  },

  routes() {
    this.namespace = 'api';

    this.get('/formulas', () => {
      return this.schema.all('formula')
    })

    this.post('/formulas', ( schema, request ) => {
      const data = JSON.parse(request.requestBody);

      console.log(data)

      return schema.create(data)
    })
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
