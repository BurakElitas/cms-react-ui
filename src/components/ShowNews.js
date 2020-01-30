import React, { Component } from 'react'
import axios from 'axios';
import NewsShowItem from './NewsShowItem';
import TopNav from './TopNav'
import Leftbox from './Leftbox'
import {Link} from 'react-router-dom'

export class ShowNews extends Component {

    state={
        News:null
    }


    componentDidMount(){
        this.getAllNews();
    }

    getAllNews=()=>{
        const api="http://localhost:8080/news/";
    axios.get(api).then((response)=>{
      console.log(response.data);
      this.setState((prevState)=>{
        return {News:response.data}
      })
    }).catch((error)=>{
      console.log("hata")
    })
    }


    render() {
        return (

            <div className="container body">
            <div className="main_container">
            
            <Leftbox/>
            <TopNav/>

            <div className="right_col" role="main">
              <div className="container">
              
                <div className="row">
                <div className="col-md-12">
                <ul class="breadcrumb">
                <li><Link to="/home">Home</Link> <span class="divider">/</span></li>
                <li><b className="layoutname">AllNews </b><span class="divider"></span></li>

              </ul>
                </div>
                  
                  

               
                </div>
                <div className="container layoutContent">
                <div className="row mt-4">
                {
                        this.state.News !==null ? this.state.News.map(item=>(
                            <NewsShowItem news={item} key={item}/>
        
                        )):null
                }
                </div>
                </div>
            </div>
            </div>

          <footer>
            <div className="pull-right">
              Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
            </div>
            <div className="clearfix"></div>
          </footer>
        </div>
      </div>

        )
    }
}

export default ShowNews
