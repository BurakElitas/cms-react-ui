import React, { Component } from 'react';
import axios from 'axios';
import Leftbox from './Leftbox'
import TopNav from './TopNav';
import '../../src/css/Edit.css';
import RowItem from './RowItem';
import {Link} from 'react-router-dom';


export class Deneme extends Component {

    constructor(){
        super();
        this.state={
            Layout:null,
            LayoutId:null
        }

        

    }

    componentDidMount(){
        let layoutId=this.props.match.params.layoutId;
        if(layoutId!==undefined){
            this.getLayout(layoutId);
        }
        
    }
    

    getLayout=(layoutId)=>{
        const api="http://localhost:8080/layout/"+layoutId;
       axios.get(api).then((response)=>{
         console.log(response.data.rowDto);
         this.setState((prevState)=>{
           return {Layout:response.data.rowDto,
            LayoutId:response.data.id,
            name:response.data.name
          }
           
         })
       }).catch((error)=>{
         console.log("hata")
       })
   
      }


    

      

     


      
          
          
      

      


    render() {
      const lId=this.props.match.params.layoutId;
        return (
            <React.Fragment>
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
                    <li>Edit<span class="divider">/</span></li>
                    <li>Layout <span class="divider">/</span></li>
                    <li><b className="layoutname">{this.state.name!==undefined ? this.state.name: null}</b><span class="divider"></span></li>
                  </ul>
                    </div>
                     
                     
                     
                    </div>
                    </div>
                    <div className="container layoutContent">
                          {
                            this.state.Layout!==null ?
                            this.state.Layout.map(item=>{
                              return (
                                  <RowItem key={item} row={item} deleteRow={this.deleteRow} deleteCol={this.deleteColumn} select={this.selectedRow} />
                              )
                            }):null
                          }
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
        
          </React.Fragment>
        )
    }
}

export default Deneme
