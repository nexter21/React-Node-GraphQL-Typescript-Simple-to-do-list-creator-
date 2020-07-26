import React, { useState } from 'react';
import './App.css';

import List from './components/List';

function App() {
  const [data, setData] = useState('');

  const addNewItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const graphqlQuery = {
      query: `mutation addItem($data: String!) {
        addItem(item: {data: $data}) {
          data
        }
      }`,
      variables: {
        data,
      },
    };

    const res = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery),
    });

    const list = await res.json();
    setData('');
  };
  return (
    <div className="App">
      <div className="navbar">To-Dos</div>

      <div className="list">
        <form className="list-creator" onSubmit={addNewItem}>
          <input
            type="text"
            placeholder="List heading"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button>Add</button>
        </form>
        <List data={data} />
      </div>
    </div>
  );
}

export default App;
