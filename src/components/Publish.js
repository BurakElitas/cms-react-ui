import React, { Component } from 'react'
import Leftbox from './Leftbox'
import TopNav from './TopNav'
import {Link} from 'react-router-dom'
import axios from 'axios'
import RowItem from './summernoteComponents/RowItem'


export class Publish extends Component {

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
   
    setSummerNote=()=>{
      const $=window.$;
      let noteids = []; 
      var colSizes=[];
      $(".layoutCol[data-id]").each(function (i, e) {
          noteids.push($(e).data("id"));
          colSizes.push($(e).data("col"));
      });
      
      for(var i=0;i<noteids.length;i++){
         let name="#"+noteids[i];

       if(i===0){
        $(name).summernote({
          placeholder: 'Başlık',
          tabsize: 2,
          height: 100,
          width:colSizes[i]*100
        });
      }
      else {
        $(name).summernote({
          tabsize: 2,
          height: 100,
          width:colSizes[i]*100-30
        });
       }
      }
      this.setState((prevState)=>{
        return {
          Noteids:noteids
        }
      })

      }
    

  
    addNews=()=>{

      const $=window.$;
      const newsId=this.props.match.params.newsId;
      const noteids=this.state.Noteids
      for(var i=0;i<noteids.length;i++){

        const api=`http://localhost:8080/newsItem/news/${newsId}/col/${noteids[i]}`;
       
        axios.post(api,{
          "element":$("#"+noteids[i]).summernote('code')
        }).then((response)=>{
          
        }).catch((error)=>{

        });
        
      }
      alert("haber yayınlandı");
    }

    getLayout=async(layoutId)=>{
        const api="http://localhost:8080/layout/"+layoutId;
      await axios.get(api).then((response)=>{

         console.log("ilk"+ response.data.rowDto)
         this.setState((prevState)=>{
           return {Layout:response.data.rowDto,
            LayoutId:response.data.id,
            name:response.data.name
          }
           
         })

       }).catch((error)=>{
         console.log("afasfasfhata")
       })
       this.setSummerNote();

      }




    render() {
        const layoutId=this.props.match.params.layoutId;
        
        const $=window.$;
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
                <li><Link to={`/edit/${layoutId}`}>Edit</Link> <span class="divider">/</span></li>
                <li>Layout <span class="divider">/</span></li>
                <li>{this.state.name!==undefined ? this.state.name: null}<span class="divider">/</span></li>
                <li><b className="layoutname">Publish </b><span class="divider"></span></li>

              </ul>
                </div>
                  
                  

               
                </div>
                <div className="container layoutContent">
                {
                  this.state.Layout!==null ?
                  this.state.Layout.map(item=>{
                    return (
                        <RowItem key={item} row={item} />
                    )
                  }):null
                }
                <div className="row mt-4">
                <div className="col-md-9"></div>
                <div className="col-md-3">
                  <div class="float-right"> <button type="button" className="btn btn-info" onClick={this.addNews}>Publish News</button></div>
                </div>
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


export default Publish
