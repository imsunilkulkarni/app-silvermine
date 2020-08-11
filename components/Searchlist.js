import React, { Component } from 'react'
import { Input } from 'antd';
import '../styles/main.scss'
import {connect} from 'react-redux'
import * as news from '../store/actions/index'
import _ from 'lodash';
import News from './News'

const WAIT_INTERVAl = 1000;

class Searchlist extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchString: props.searchString,
      searchResults: []
  };
  this.handleChange = this.handleChange.bind(this);
  this.onSearchSources = this.onSearchSources.bind(this);
  }

  componentDidMount() {
    this.props.fetchNews();
}

onSourceClick()  {
 // this.onSearchSources();
   let newUrl = `https://newsapi.org/v2/everything?qInTitle=${this.state.searchString}&apiKey=fac754a722254fc8a7aebd5a3f7bfe29`;
   this.props.fetchNews(newUrl);
}

handleChange(event) {
  this.setState({searchString: event.target.value});
}

onSearchSources() {

  let searchString = this.state.searchString;

  if (searchString.length > 0) {
      let searchResults = _.filter(this.props.newsData, (item) => {
          return  item.author.indexOf(searchString) > -1
                  || item.content.indexOf(searchString) > -1
                  || item.description.indexOf(searchString) > -1
                  || item.title.indexOf(searchString) > -1
                  || item.source.indexOf(searchString) > -1;
      });

      this.setState({
          searchResults
      });
  }
  else {
      this.setState({
          searchResults: []
      });
  }
}


 

    render() {
        return (
          <div className="search-contianer">
          <form>
            <fieldset>
           <legend>Welcome Reader</legend>
            <div className="search-subcontainer">
              <div className="input-group">
                <input
                  type="text"
                  name="searchString"
                  className="form-control"
                  placeholder="Search..."
                  value={this.state.searchString || ''}
                  onChange={event => this.handleChange(event)}
                  onKeyUp={this.handleKeyUp}
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {this.onSourceClick()}}
                  >
                    Search
                  </button>
                  </div>
              </div>
            </div>
            <News/>
            </fieldset>
          </form>
        </div>
        )
    }
}

const mapStateToProps = (state)=>{
  return {
    newsData: state.newsData,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {fetchNews : (query, currentPage, pageLimit) => 
   dispatch(news.fetchNews(query, currentPage, pageLimit)) } 
 }



export default connect(mapStateToProps, mapDispatchToProps)(Searchlist);
