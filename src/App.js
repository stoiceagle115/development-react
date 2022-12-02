/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import "./App.css";
import "./index.css";
import "./bootstrap.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem.js";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [type, setType] = useState("All");
  const [list, setList] = useState(["All"]);

  const [store, setStore] = useState([]);

  //const filteredData = bakeryData

  let [changeText, setChangeText] = useState(true);
  let [changeText2, setChangeText2] = useState(true);
  let [changeText3, setChangeText3] = useState(true);
  let [changeText4, setChangeText4] = useState(true);
  const handleChange = key => {
    //setData(bakeryData.filter(fixData))
    if (key === "Sweet") {
      setChangeText2(!changeText2);
    }

    if (key === "Sour") {
      setChangeText(!changeText);
    }

    if (key === "Sort") {
      setChangeText3(!changeText3);
    }

    if (key === "Cart") {
      setChangeText4(!changeText4);
    }


    return
  };

  const addToList = key => {
    // make deep copy of old list; add the item
    const newList = [...list, key]
    // set the state of the list to the updated copy
    setList(newList);
  }

  const subFromList = key => {
    // make deep copy of old list; add the item
    const newList = list.filter(item => key !== item)
    // set the state of the list to the updated copy
    setList(newList);
  }

  const selectFilterType = eventKey => {
    if (list.some(item => eventKey === item)) {
      subFromList(eventKey)
    } else {
      addToList(eventKey)
    }

    if (eventKey === "Sort") {
      checkSort()
      return
    }

    setType(eventKey);
  };

  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if (type === "All") {
      return true
    } else if (type === item.type) {
      return true
    } else {
      return false
    }
  }

  const fixData = item => {
    /*if (list.length === 0) {
      return true
    }*/

    if (type === "All") {
      return true
    } else if (list.some(res => item.type === res)) {
      return true
    } else {
      return false
    }
  }

  const fixItems = item => {
    if (items.some(res => item.name === res)) {
      return true
    } else {
      return false
    }
  }

  const checkSort = () => {
    if (list.some(res => "Cart" === res)) {
      return bakeryData.filter(fixItems)
    }
    else if (list.some(res => "Sort" === res)) {
      return bakeryData.filter(fixData).sort((a, b) => a.price - b.price)
    }
    else {
      return bakeryData.filter(fixData)
    }
  }

  let filteredData = checkSort()


  //setStore(filteredData)

  /* {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
        <BakeryItem name={item.name} description={item.description} price={item.price} image={item.image}
          totalPrice={totalPrice} updatePrice={setTotalPrice} items={items} setItems={setItems} />// replace with BakeryItem component
      ))} */

  /* { list.map((item) => { return <p>{item}</p>; })}*/

  return (

    <div className="App">
      <div class="container d-flex text-center">
        <Nav onSelect={selectFilterType}>
          <Nav.Item><Nav.Link eventKey="All"> <button onClick={() => handleChange("All")} class="button">Reset</button></Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="Sour"> <button onClick={() => handleChange("Sour")} class="button">Sour: {changeText ? "Off" : "On"} </button> </Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="Sweet"> <button onClick={() => handleChange("Sweet")} class="button">Sweet: {changeText2 ? "Off" : "On"}</button> </Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="Sort"> <button onClick={() => handleChange("Sort")} class="button">Sort by Price: {changeText3 ? "Off" : "On"}</button> </Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="Cart"> <button onClick={() => handleChange("Cart")} class="button">Cart: {changeText4 ? "Off" : "On"} (Cart needs to be turned off to Reset)</button> </Nav.Link></Nav.Item>
        </Nav>
      </div>

      <h1>My Bakery</h1>

      <body>
        <div class="row">
          <div class="col-6 d-flex flex-column">
            {filteredData.map((item) => (
              <div>
                <BakeryItem name={item.name} image={item.image} type={item.type} description={item.description} price={item.price}
                  totalPrice={totalPrice} updatePrice={setTotalPrice} items={items} setItems={setItems} />
                <p> ------------------------- </p> </div>
            ))}

          </div>
          <div class="col-6">
            <h2>Cart</h2>
            {items.map((item) => { return <p>{item}</p>; })}
            <h3>Total Price = ${totalPrice}</h3>
          </div>
        </div>
      </body>



    </div >

  );
}

export default App;
