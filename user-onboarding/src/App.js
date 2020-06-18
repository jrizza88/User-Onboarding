import React, {useState} from 'react';
import './App.css';
import Form from "./components/Form";
import UserCard from "./components/UserCard";

function App() {

  const [users, setUser] = useState([
    {
      id: "",
      name: "",
      email: ""
    }
])

  const addNewUser = user => {
    const newUser = {
      id: Date.now(),
      name: user.name,
      email: user.email
    };
    setUser([...users, newUser])
  }



  return (
    <div className="App">
      {/* <Form /> */}
      <Form addUserProp={addNewUser}  />
      <UserCard user={users}/>
    </div>
  );
}

export default App;
