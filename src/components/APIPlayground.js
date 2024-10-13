import React, { useState } from 'react';
import './APIPlayground.css'; // Estilos personalizados

function APIPlayground() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [params, setParams] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica de requisição para a API (usando fetch ou axios, por exemplo)
    console.log(`URL: ${url}, Method: ${method}, Params: ${params}`);
  };

  return (
    <div className="api-playground">
      <h1>API Playground</h1>
      <p>This is where you can test APIs.</p>

      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <label>
          Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <label>
          Parameters:
          <input type="text" value={params} onChange={(e) => setParams(e.target.value)} />
        </label>
        <button type="submit">Send Request</button>
      </form>

      {response && (
        <div className="response">
          <h3>Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default APIPlayground;
