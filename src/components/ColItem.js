import React, { Component } from 'react'

export class ColItem extends Component {
   
   
    render() {
    
        const {col,deleteColumn}=this.props;
        return (
            <React.Fragment>
                <div className={`col-md-${col.colSize} col-sm-${col.colSize} layoutCol `} data-id={col.id}>
                    <i onClick={()=>{deleteColumn(col.id)}} className="fa fa-trash ml-auto"></i>

                </div>
            </React.Fragment>
        )
    }
}


export default ColItem
