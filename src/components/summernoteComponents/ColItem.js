import React, { Component } from 'react'

export class ColItem extends Component {
   
   
    render() {
    
        const {col}=this.props;
        return (
            <React.Fragment>
                <div className={`col-md-${col.colSize} col-sm-${col.colSize} layoutCol`} id={col.id} data-col={col.colSize} data-id={col.id}>

                </div>
            </React.Fragment>
        )
    }
}


export default ColItem
