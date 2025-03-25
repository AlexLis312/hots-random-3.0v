import React, { Component } from "react";
// import _ from "lodash";
import "./App.css";
import { heroList } from "./data-heroes";

class App extends Component {
  state = { randomBox: [...heroList], filter: "", box: [], winnerBox: [] };

  someFilter = () => {
    return this.state.randomBox.filter((hero) => hero.name.includes(this.state.filter));
  };

  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleClick = (event) => {
    console.log(event.target.alt);

    const selectHero = this.state.randomBox.find((hero) => event.target.alt === hero.name);
    const selectHeroIndex = this.state.randomBox.findIndex(
      (hero) => hero.name === event.target.alt
    );

    this.state.randomBox.splice(selectHeroIndex, 1);

    if (selectHero) {
      this.setState(
        (prevState) => ({
          box: [...prevState.box, selectHero],
        }),
        () => console.log(this.state.box)
      );
    }
  };

  boxHandleClick = (event) => {
    console.log(event.target.alt);

    const selectHero = this.state.box.find((hero) => event.target.alt === hero.name);
    const selectHeroIndex = this.state.box.findIndex((hero) => hero.name === event.target.alt);

    this.state.box.splice(selectHeroIndex, 1);

    if (selectHero) {
      this.setState(
        (prevState) => ({
          randomBox: [...prevState.randomBox, selectHero],
        }),
        () => console.log(this.state.randomBox)
      );
    }
  };

  resetUI = () => {
    this.setState({ randomBox: [], box: [] });
  };

  random = () => {
    const num = this.state.box.length;
    const randomNum = Math.floor(Math.random() * num);
    const winner = this.state.box[randomNum];

    this.setState({ winnerBox: [winner] }, () => {
      console.log(this.state.winnerBox);
    });

    console.log(randomNum);
    this.resetUI();
  };

  fullRandom = () => {
    const num = this.state.randomBox.length;
    const randomNum = Math.floor(Math.random() * num);
    const winner = this.state.randomBox[randomNum];

    this.setState({ winnerBox: [winner] }, () => {
      console.log(this.state.winnerBox);
    });

    console.log(randomNum);
    this.resetUI();
  };

  render() {
    const filteredBox = this.someFilter();
    return (
      <div className="App">
        <h2>HOTS-random 3.0v</h2>
        <button type="button" onClick={this.random}>
          Random
        </button>
        <button type="button" onClick={this.fullRandom}>
          Full-Random
        </button>
        <ul>
          {this.state.box.map(({ name, icon }) => (
            <li key={name}>
              <p>{name}</p>
              <img src={icon} alt={name} width={64} height={64} onClick={this.boxHandleClick} />
            </li>
          ))}
        </ul>
        <ul className="Winner">
          {this.state.winnerBox.map(({ name, icon }) => (
            <li key={name}>
              <p>{name}</p>
              <img src={icon} alt={name} width={64} height={64} />
            </li>
          ))}
        </ul>
        <label>
          <input type="text" onChange={this.handleChange} />
        </label>
        <ul>
          {filteredBox.map(({ name, icon }) => (
            <li key={name}>
              <p>{name}</p>
              <img src={icon} alt={name} width={64} height={64} onClick={this.handleClick} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
