import logo from './logo.svg';
import './App.css';
import React, { userState, useState } from 'react';
function App() {
  const [count, setCount] = useState(0);
  return (
<div style={{textAlgin:'center', padding:'50px'}}>
<h1>Hello React 👋</h1>
<p>You clicked {count} times</p>
<button onClick={()=> setCount(count +1)}>Click Me</button>
</div>
  );
}

export default App;
