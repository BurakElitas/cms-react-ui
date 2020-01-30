import React, { Component } from 'react';
import axios from 'axios';
import Leftbox from './Leftbox'
import TopNav from './TopNav';
import '../../src/css/Edit.css';
import RowItem from './RowItem';
import {Link} from 'react-router-dom';


export class Edit extends Component {

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


      addRow=()=>{
        let rowSayac=this.state.Layout.length;
        
        if(rowSayac!==0){
          rowSayac=this.state.Layout[rowSayac-1].displayNumber+1;
        }
        else{
          rowSayac=1;
        }
        const api="http://localhost:8080/row/"+this.state.LayoutId;

        axios.post(api,{
          displayNumber:rowSayac
        }).then((response)=>{
          this.setState((prevState)=>{
            return {
              Layout:[...prevState.Layout,response.data]
            }
          })
        })

     }

     deleteColumn=(colId)=>{
      const api="http://localhost:8080/col/"+colId;
      console.log("içerdeyim");

      axios.delete(api).then((response)=>{
        if(response.data===true){
          let layoutId=this.props.match.params.layoutId;
          this.getLayout(layoutId);
        }
        else{
          console.log("hata");
        }
      }).catch((error)=>{

      })
    }

      deleteRow=(rowId)=>{
        const api="http://localhost:8080/row/"+rowId;
        axios.delete(api).then((response)=>{
          if(response.data===true){
            this.setState((prevState)=>{
              return{
                Layout:prevState.Layout.filter(x=>x.id!==rowId)
              }
            })
          }
          else{
            console.log("hata");
          }
        }).catch((error)=>{

        })
      }

      colSayac=(rowId)=>{
        const row=this.state.Layout.filter(x=>x.id===rowId);
        const colLenght=row[0].colDtos.length;
        
        if(colLenght===0 || colLenght===undefined){
          return 1;
        }

        let colSayac=row[0].colDtos[colLenght-1].displayNumber+1;
        return colSayac;
        
      }


      addCol=(e)=>{
          e.preventDefault();
          let colSize=e.target.elements.colSize.value;
          let rowId=this.state.selectedRow;
          let layoutId=this.props.match.params.layoutId;
          
          if(rowId!==undefined)
          {
            let colSayac=this.colSayac(rowId);
            
            const api="http://localhost:8080/col/"+rowId;

              axios.post(api,{
                displayNumber:colSayac,
                colSize:colSize
              }).then((response)=>{
               this.getLayout(layoutId);
              })
                  

          }
          else{
            alert("Lütfen Kolon eklenecek Row'u Seçiniz.Row seçmeden Kolon eklemeye çalışıyorsun.");
          }
          
          
      }

      selectedRow=(rowId)=>{
        var selectedRowItem = document.querySelector('.layoutRow[data-id="'+rowId+'"]');
        var allRowItem=document.querySelectorAll('.layoutRow');
        
        for (var i = 0; i < allRowItem.length; i++) {
          allRowItem[i].classList.remove('selected');
        }
        
        selectedRowItem.classList.add("selected");
        
        this.setState({
          selectedRow:rowId
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
                      <div className="col-md-2">
                        <button type="button" onClick={this.addRow} className="btn btn-primary"><i className="fa fa-plus"/>Add Row</button>
                      </div>
                      <div className="col-md-8">
                      <form onSubmit={this.addCol} class="form-inline">  
                     <div className="form-group">
                        <select className="custom-select" id="colSize">
                          <option value="1">col-1</option>
                          <option value="2">col-2</option>
                          <option value="3">col-3</option>
                          <option value="4">col-4</option>
                          <option value="5">col-5</option>
                          <option value="6">col-6</option>
                          <option value="7">col-7</option>
                          <option value="8">col-8</option>
                          <option value="9">col-9</option>
                          <option value="10">col-10</option>
                          <option value="11">col-11</option>
                          <option value="12">col-12</option>
                        </select>
                     </div>
                     <div className="form-group ml-3">
                      <button type="submit" class="btn btn-success ml-1"><i className="fa fa-plus"/>Add Column </button>
                    </div>
                  </form>

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

export default Edit
