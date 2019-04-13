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

  componentDidMount() {
    const interval = setInterval(() => {
      this.getData();
    }, 6000);
  }

  getData() {
    let queueCats = [];
    let queueDogs = [];

    fetch(`${config.REACT_APP_API_ENDPOINT}/cats`)
      .then(res => res.json())
      .then(json => {
        queueCats = json || [];

        fetch(`${config.REACT_APP_API_ENDPOINT}/dogs`)
          .then(res => res.json())
          .then(json => {
            queueDogs = json || [];

            this.setState({queueCats, queueDogs, loading: false});
          });
      });
  }

  adopt(type) {
    const pet = (type === 'cat') 
      ? this.state.queueCats[this.state.selectedCatIndex]
      : this.state.queueDogs[this.state.selectedDogIndex];

    console.log(pet);

    if(pet.adopted === '') {
      fetch(`${config.REACT_APP_API_ENDPOINT}/${type}s/${pet.name}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({adopted: this.getRandomName()})
      });
    } else {
      console.log('error: pet already adopted');
    }
  }

  getRandomName() {
    return 'John';
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
            <PetList pets={this.state.queueDogs} selected={this.state.selectedDogIndex} />            
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