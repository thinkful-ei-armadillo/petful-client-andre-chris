import React, { Component } from 'react';

export default class CurrentDog extends Component {
  render() {
    if(this.props.pet.empty) {
      return <p className="alert-empty">All dogs have a safe home! Please wait for more dogs to show up.</p>
    }

    return (
      <article>
        <header>
          <h2>{this.props.pet.name}</h2>
          <img src={this.props.pet.imageURL} alt={this.props.pet.imageDescription}></img>
        </header>

        <ul className="pet-info">
          <li>Age: <span>{this.props.pet.age}</span></li>
          <li>Sex: <span>{this.props.pet.sex}</span></li>
          <li>Breed: <span>{this.props.pet.breed}</span></li>
          <li>Story: <span>{this.props.pet.story}</span></li>
        </ul>

        <button type="button" className="btn-adopt" onClick={this.props.adopt}>Adopt me!</button>
      </article>
    );
  }
}