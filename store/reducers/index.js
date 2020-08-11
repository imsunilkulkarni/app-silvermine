

const initialState = {
    fetching:false,
    fetched: false,
    newsData:'',
    error:null,
    
}
const cartReducer = (state = initialState, action) => {
        switch(action.type){
            case "REQUEST_POSTS" :{
                return {...state, fetching:true}
                break;
            }
            case "FETCH_USER_ERROR" :{
                return {...state, fetching:false, error:action.payload}
                break;
            }
            case "RECEIVE_POSTS" :{
                return {...state,  newsData:action.newsData}
                break;
            }
            case "SEARCH":{
                return action.keyword;
                break;
            }
            default:
                return state;
        }

    
}

export default cartReducer;