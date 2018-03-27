//Lab Friday - React promises API 
//create-react-app folder name
//npm install axios
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      trendingUrls: [], 
      searchingUrls: [],
    }
  }
  
  componentWillMount() { //WillMount coponnent is good for loading some data when pages opened
    //let promise = axios.get() the variable name is optional or and can be named anything
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=CPpOlOclGkH2ViFud1NjtgBZ7w92Tyqy')
         .then((response) => { //promise.then() is to promise the result will return and it's a higher order function
        // console.log(response.data.data[0].images.original.url)
        console.log(response.data);
        let urls = []
        for (let i = 0; i < response.data.data.length; i++) { //this is looping all the data from API key, this loop has nothing to do with our page showing
          urls.push(response.data.data[i].images.original.url)
        }
        this.setState({
          trendingUrls: urls
        })
      })
  }
  
  searchHandler = (e) => {
    e.preventDefault();
    axios.get('https://api.giphy.com/v1/gifs/search?api_key=CPpOlOclGkH2ViFud1NjtgBZ7w92Tyqy&q=' + this.searchInput.value)
         .then((response) => {
      let urls = []
      for (let i = 0; i < response.data.data.length; i++) {
        urls.push(response.data.data[i].images.original.url)
      }
      this.setState({
        searchingUrls: urls
      }, () => {
        console.log(this.state.searchingUrls)
      })
    })
  }


  render() {
    let imageArray = this.state.trendingUrls.map((imageUrl, i)=>{
      return <img key={i} src={imageUrl} alt="Giphy trending"/>
    })

    let searchArray = this.state.searchingUrls.map((searchResult,i)=>{
      return <img key={i} src={searchResult} alt="Giphy search results"/>
      console.log('search worked?');
      
    })
    return (
      <div className="App container">
        <header>
          <form>
          <input type="text" className="search-query form-control" placeholder="Search..."
            ref={(self) => { this.searchInput = self }} />
          <button className="btn waves-effect waves-light" type="submit" onClick={this.searchHandler}>
          Search
          </button>  
          </form>
        </header>
        <div style={{marginTop:'10%'}}> {/* Giphys display*/}
          <div>{searchArray}</div>
          <div className="centered" style={{width:'100%', borderBottom:'2px solid violet'}}>
          <h3>Today's trending!</h3>
          </div>
          <div>
            {/* <img src={this.state.url} /> use map to loop out the image array to show in the page  */}
            {imageArray}
          </div>
        </div>  
      </div>
    );
  }
}

export default App;


