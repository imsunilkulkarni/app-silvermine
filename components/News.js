import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card, Col,Row, Pagination} from 'antd';
//import Nextpage from './Pagination'
import * as news from '../store/actions/index';
import '../styles/main.scss'

 class News extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      minValue: 0,
      maxValue: 5
    }
  }  
  
  componentDidMount(){
    this.props.fetchNews()
  }

  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 5
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 5
      });
    }
  };



  render() {
    var newsList = this.props.newsData ? 
    this.props.newsData.slice(this.state.minValue,this.state.maxValue).map((news, index) => {
      return (
        <div className="site-card-border-less-wrapper cardStyle">
        <Row gutter={16}>
          <Col span={8}>
            <buton onClick={this.onSourceClick}>
            <Card  title={news.author} bordered={true}  style={{ width: 250, margin:10,
               borderRadius: 20  }} extra={<a href={news.url} target="_blank">More</a>}>
            <span>{news.description}</span>
            </Card>
            </buton>
          </Col>
        </Row>
      </div>
      )
    }) : ""
    return(
      <div>
      <div className="site-card-border-less-wrapper">
        
      <div className="d-flex">{newsList}</div>
    
      </div>
      <div className="pagination">
      <Pagination
          defaultCurrent={1}
          defaultPageSize={5}
          onChange={this.handleChange}
          total={this.props.newsData.length}
        />
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(News);
