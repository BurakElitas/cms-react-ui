import React, { Component } from 'react'
import Leftbox from './Leftbox'
import axios from 'axios';
import TopNav from './TopNav';
import NewsItem from './NewsItem'


export class New extends Component {

   constructor(){
     super();
     this.state={
       Layouts:[],
       Categories:[]
     }
   }


   getAllCategories=()=>{
    const api="http://localhost:8080/category/all";
    axios.get(api).then((response)=>{
      this.setState((prevState)=>{
        return {Categories:response.data}
      })
    }).catch((error)=>{
      console.log("hata")
    })
   }

   getLayouts=()=>{
    const api="http://localhost:8080/layout/user/1";
   axios.get(api).then((response)=>{
     this.setState((prevState)=>{
       return {Layouts:response.data}
     })
   }).catch((error)=>{
     console.log("hata")
   })

  }

  getNews=()=>{
    const api="http://localhost:8080/news/user/1";
    axios.get(api).then((response)=>{
      console.log(response.data);
      this.setState((prevState)=>{
        return {News:response.data}
      })
    }).catch((error)=>{
      console.log("hata")
    })
  }

  addNews=(e)=>{
    e.preventDefault();
    let layoutId=e.target.elements.layout.value;
    let categoryId=e.target.elements.category.value;
    let title=e.target.elements.title.value;
    if(title!=="")
    {
        
        e.target.elements.title.value="";
        const api=`http://localhost:8080/news/user/1/category/${categoryId}/layout/${layoutId}`;

        axios.post(api,{
          "title":title
        }).then((response)=>{
          if(response.data===true){
            this.getNews();
          }
        }).catch((error)=>{

        });
       }
       else{
           alert("title girmedin");
       }

    }

    

  
  

   componentDidMount(){
       this.getLayouts();
     this.getAllCategories();
     this.getNews();
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
                    <li><b className="layoutname">News</b> <span class="divider"></span></li>
                  </ul>
                    </div>
                      <div className="col-md-12">
                      <form onSubmit={this.addNews} class="form-inline">
                      
                      <div className="form-group">
                        <input type="text" className="form-control mb-1"  id="title" placeholder="News Title"/>
                      </div>
                      <div className="form-group">
                      <input type="file" className="form-control mb-1" id="image" placeholder="İmage"/>
                    </div>
                      
                     <div className="form-group ml-1">
                        <select className="custom-select" id="category">
              
                          {
                            this.state.Categories!==null ?  this.state.Categories.map(item=>(
                              <option value={item.id}>{item.name}</option>
                            )):null
                          }

                        </select>
                       
                     </div>
                      <div className="form-group ml-1">
                      <select className="custom-select" id="layout">
              
                      {
                        this.state.Layouts!==null ?  this.state.Layouts.map(item=>(
                          <option value={item.id}>{item.name}</option>
                        )):null
                      }

                    </select>
                      </div>

                     <div className="form-group ml-3">
                      <button type="submit" class="btn btn-primary ml-2">Add News</button>
                    </div>
                  </form>
                      </div>
                    </div>
                    <div className="row mt-4">
                     
                      <div className="col-md-12">
                      <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Layout</th>
                          <th scope="col">Category</th>
                          <th scope="col">Edit</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {
                           this.state.News!==undefined ?  this.state.News.map(item=>(
                                <NewsItem news={item} key={item}/>

                            )) :null
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

export default New