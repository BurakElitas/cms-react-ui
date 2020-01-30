import React, { Component } from 'react';
import ColItem from './ColItem';

export class RowItem extends Component {
    state={
        rowId:this.props.row.id,
        isActive:false
    }

    selectedRow=()=>{
        if(this.state.isActive===false){ 
      this.setState((prevState)=>{
          return {
              isActive:true
          }
      })

      }
      else {
        this.setState((prevState)=>{
            return {
                isActive:false
            }
        })

      }
        
      
    }


    render() {
        const {row,deleteRow,deleteCol,select}=this.props;
        
    
        return (
            <React.Fragment>
                <div className={`row layoutRow mt-3 ${this.state.isActive === true ? "selected" : "" }`} data-id={row.id} onClick={()=>{select(row.id)}} >
                   
                    {
                        row.colDtos.map(item=>{
                            return (
                                <ColItem col={item} key={item} deleteColumn={deleteCol} />
                            )
                        })
                    }
                    <i onClick={()=>{deleteRow(row.id)}} className="fa fa-trash ml-auto"></i>
                </div>
            </React.Fragment>
        )
    }
}

export default RowItem
