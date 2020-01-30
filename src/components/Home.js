import React, { Component } from 'react'
import Leftbox from './Leftbox'
import TableItem from './TableItem'
import axios from 'axios';
import TopNav from './TopNav';
import {Link} from 'react-router-dom';



export class Home extends Component {

   constructor(){
     super();
     this.state={
       Layouts:[],
       Categories:[]
     }
   }

   getLayouts=()=>{
     const api="http://localhost:8080/layout/user/1";
    axios.get(api).then((response)=>{
      console.log(response.data);
      this.setState((prevState)=>{
        return {Layouts:response.data}
      })
    }).catch((error)=>{
      console.log("hata")
    })

   }

   getAllCategories=()=>{
    const api="http://localhost:8080/category/all";
    axios.get(api).then((response)=>{
      console.log(response.data);
      this.setState((prevState)=>{
        return {Categories:response.data}
      })
    }).catch((error)=>{
      console.log("hata")
    })
   }


   addLayout=(e)=>{
        e.preventDefault();
        let layoutName=e.target.elements.name.value;
        console.log(layoutName);
        let category=e.target.elements.category.value;
       

       if(layoutName!==""){
        e.target.elements.name.value="";
        const api="http://localhost:8080/layout/add/user/1/category/"+category;

        axios.post(api,{
          "name":layoutName
        }).then((response)=>{
          if(response.data===true){
            this.getLayouts();
          }
        }).catch((error)=>{

        });
       }
       else {
         alert("Layout Adı girmediniz");
       }
   }

   componentDidMount(){
     this.getLayouts();
     this.getAllCategories();
   }

    render() {
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
                    <li>Home <span class="divider">/</span></li>
                    <li><b className="layoutname">Layouts</b> <span class="divider"></span></li>
                  </ul>
                    </div>
                      <div className="col-md-8">
                      <form onSubmit={this.addLayout} class="form-inline">
                      
                      <div className="form-group">
                        <input type="text" className="form-control mb-1" id="inputPassword2" id="name" placeholder="New Layout"/>
                      </div>
                      
                     <div className="form-group ml-3">
                        <select className="custom-select" id="category">
              
                          {
                            this.state.Categories!==null ?  this.state.Categories.map(item=>(
                              <option value={item.id}>{item.name}</option>
                            )):null
                          }

                        </select>
                     </div>
                     <div className="form-group ml-3">
                      <button type="submit" class="btn btn-primary ml-2">Add Layout</button>
                    </div>
                  </form>
                      </div>

                      <div className="col-md-4">
                          <Link to="/news" className="btn btn-success"><i class="fa fa-news"></i>Yeni Haber</Link>
                      </div>
                    </div>
                    <div className="row mt-4">
                     
                      <div className="col-md-12">
                      <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Layout Name</th>
                          <th scope="col">Edit</th>
                          
                        </tr>
                      </thead>
                      <tbody>

                        {
                          this.state.Layouts.map(item=>(
                            <TableItem Layout={item} key={item}/>
                          ))

                        }
                        
                      </tbody>
                    </table>
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
          </React.Fragment>
    )
    }
}

export default Home