import axios from 'axios';


export const SELECT_NEWS ='SELECT_NEWS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';


export const API_URL = 'https://newsapi.org/v2';
export const API_KEY = 'fac754a722254fc8a7aebd5a3f7bfe29'

//API End Points
export const HEADLINES = `${API_URL}/top-headlines${API_KEY}`;
export const SEARCH = `${API_URL}/everything${API_KEY}&sortBy=relevancy`;


export const actSearchProduct = keyword => {
    return {
      type: SEARCH,
      keyword
    };
  };





export function fetchNews(url){
    return function(dispatch){
        dispatch({type:"REQUEST_POSTS"});
            return axios.get(url ? url :`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${API_KEY}`)
            .then((response) => {
               console.log("fetchnews", response.data.articles);
                dispatch({type:"RECEIVE_POSTS", newsData:response.data.articles})
            })
            .catch((err) =>{
                dispatch({type:"FETCH_USER_ERROR", payload:err})
            })
    }
}

