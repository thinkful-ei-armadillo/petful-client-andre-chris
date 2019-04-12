import React, { Component } from 'react';

export default class PetList extends Component {
  render() {
    const jsx = this.props.pets.map(pet => {
      return (
        <li key={Math.random()}>
          <img src={pet.imageURL} alt="thumbnail"></img>
          <p>{pet.name}</p>
        </li>
      );
    });

    return <ul className="pet-list">{jsx}</ul>;
  }
}