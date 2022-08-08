import './App.css';
import Axios from 'axios'
import React, { useState, useEffect } from 'react';

function App() {

  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data)
    })
  }, [])

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', {
      foodName: foodName,
      days: days
    });
  };

  const updateFood = (id) => {
    Axios.put('http://localhost:3001/update', {
      id: id,
      newFoodName: newFoodName
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
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
      <div>______________________________________</div>
      <h1>Food List</h1>
      <div></div>
      {foodList.map((val, key) => {
        return (
          <div key={key} class='food'>
            <h4>Food: {val.foodName}</h4>
            <h4>Days: {val.daysSinceIAte}</h4>
            <input
              type='text'
              placeholder='New food name'
              onChange={(e) => {
                setNewFoodName(e.target.value);
              }}
            />
            <button onClick={() => {
              updateFood(val._id)
            }}>Update
            </button>
            <button onClick={() => {
              deleteFood(val._id)
            }}
            >Delete
            </button>
          </div>)
      })}
    </div>
  );
}

export default App;
