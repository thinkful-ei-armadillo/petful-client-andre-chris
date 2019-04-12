import React, { Component } from 'react';
import CurrentCat from '../components/CurrentCat';
import CurrentDog from '../components/CurrentDog';
import config from '../config';

export default class DashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queueCats: [],
      queueDogs: [],
      selectedCatIndex: 0,
      selectedDogIndex: 0,
      emptyObj: {
        imageURL: '',
        imageDescription: '',
        name: '',
        sex: '',
        age: 0,
        breed: '',
        story: '',
        adopted: false,
        empty: true,
      }
    };
  }

  componentWillMount() {
    // GET request goes here
    let queueCats = [
      {
        imageURL: 'https://www.humanesociety.org/sites/default/files/styles/400x400/public/2018/06/cat-217679.jpg?h=c4ed616d&itok=H0FcH69a',
        imageDescription: 'A cat',
        name: 'Falafel the cat',
        sex: 'female',
        age: 8,
        breed: 'supercat',
        story: 'found behind a dumpster',
        adopted: false,
      }
    ];
    let queueDogs = [];

    this.setState({queueCats, queueDogs});
  }

  adopt(type) {
    const pet = (type === 'cat') 
      ? this.state.queueCats[this.state.selectedCatIndex]
      : this.state.queueDogs[this.state.selectedDogIndex];

    if(! pet.adopted) {
      // PATCH request goes here
      console.log('congrats on ur new pet');
    } else {
      console.log('error: pet already adopted');
    }
  }

  render() {
    const currentCat = this.state.queueCats[this.state.selectedCatIndex] || this.state.emptyObj;
    const currentDog = this.state.queueDogs[this.state.selectedDogIndex] || this.state.emptyObj;

    return (
      <main>
        <div className="queue-container">
          <section className="queue-dogs">
            <CurrentDog pet={currentDog} adopt={() => this.adopt('dog')} />            
          </section>

          <section className="queue-cats">
            <CurrentCat pet={currentCat} adopt={() => this.adopt('cat')} />
          </section>
        </div>
      </main>
    );
  }
}