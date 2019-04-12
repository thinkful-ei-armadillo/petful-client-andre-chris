import React, { Component } from 'react';

export default class CurrentCat extends Component {
  render() {
    if(this.props.pet.empty) {
      return <p className="alert-empty">All {this.props.type}s have a safe home! Please wait for more {this.props.type}s to show up.</p>
    }

    return (
      <article>
        <header>
          <button type="button" onClick={this.props.prev}>⯇</button>
          <h2>{this.props.pet.name}</h2>
          <button type="button" onClick={this.props.next}>⯈</button>
        </header>        

        <div className="preview">
          <img src={this.props.pet.imageURL} alt={this.props.pet.imageDescription}></img>
        </div>

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