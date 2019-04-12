import React, { Component } from 'react';
import CurrentPet from '../components/CurrentPet';
import PetList from '../components/PetList';
import config from '../config';

export default class DashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
      },
      {
        imageURL: 'https://boygeniusreport.files.wordpress.com/2017/01/cat.jpg?quality=98&strip=all&w=782',
        imageDescription: 'A cat',
        name: 'Cheesecake',
        sex: 'female',
        age: 8,
        breed: 'supercat',
        story: 'found behind a dumpster',
        adopted: false,
      },
      {
        imageURL: 'https://static.boredpanda.com/blog/wp-content/uploads/2016/02/japanese-grumpy-cat-angry-koyuki-moflicious-22.jpg',
        imageDescription: 'A cat',
        name: 'Joy',
        sex: 'female',
        age: 8,
        breed: 'supercat',
        story: 'found behind a dumpster',
        adopted: false,
      },
    ];
    let queueDogs = [];

    this.setState({queueCats, queueDogs, loading: false});
  }

  adopt(type) {
    const pet = (type === 'cat') 
      ? this.state.queueCats[this.state.selectedCatIndex]
      : this.state.queueDogs[this.state.selectedDogIndex];

    if(! pet.adopted) {
      // PATCH request goes here
      // for request body, just send the name (to put in queue)
      console.log('congrats on ur new pet');
    } else {
      console.log('error: pet already adopted');
    }
  }

  prev(type) {
    if(type === 'cat') {
      const newIndex = this.state.selectedCatIndex - 1;

      if(newIndex < this.state.queueCats.length && newIndex >= 0) {
        this.setState({selectedCatIndex: newIndex});
      }
    } else {
      const newIndex = this.state.selectedDogIndex - 1;
      
      if(newIndex < this.state.queueDogs.length && newIndex >= 0) {
        this.setState({selectedDogIndex: newIndex});
      }
    }
  }

  next(type) {
    if(type === 'cat') {
      const newIndex = this.state.selectedCatIndex + 1;

      if(newIndex < this.state.queueCats.length && newIndex >= 0) {
        this.setState({selectedCatIndex: newIndex});
      }
    } else {
      const newIndex = this.state.selectedDogIndex + 1;
      
      if(newIndex < this.state.queueDogs.length && newIndex >= 0) {
        this.setState({selectedDogIndex: newIndex});
      }
    }
  }

  render() {
    const currentCat = this.state.queueCats[this.state.selectedCatIndex] || this.state.emptyObj;
    const currentDog = this.state.queueDogs[this.state.selectedDogIndex] || this.state.emptyObj;

    if(this.state.loading) {
      return <div className="loader">Loading...</div>;
    }

    return (
      <main>
        <div className="queue-container">
          <section className="queue-dogs">
            <CurrentPet type="dog" pet={currentDog} 
              adopt={() => this.adopt('dog')} 
              prev={() => this.prev('dog')} 
              next={() => this.next('dog')} />    
          </section>

          <section className="queue-cats">
            <CurrentPet type="cat" pet={currentCat} 
              adopt={() => this.adopt('cat')} 
              prev={() => this.prev('cat')} 
              next={() => this.next('cat')} />
            <PetList pets={this.state.queueCats} selected={this.state.selectedCatIndex} />
          </section>
        </div>
      </main>
    );
  }
}