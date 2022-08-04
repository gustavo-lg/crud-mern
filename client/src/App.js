import './App.css';
import Axios from 'axios'
import React, { useState, useEffect } from 'react';

function App() {

  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);

  useEffect(()=>{
    Axios.get('http://localhost:3001/read').then((response)=>{
      console.log(response)
    })
  }, [])

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', { 
      foodName: foodName, 
      days: days });
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <label>Food name:</label>
      <input
        type='text'
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label>Days since you ate it:</label>
      <input
        type='number'
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={addToList}>Add to list</button>
    </div>
  );
}

export default App;
