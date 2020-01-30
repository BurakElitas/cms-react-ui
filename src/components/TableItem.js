import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../../node_modules/font-awesome/css/font-awesome.min.css';

export class TableItem extends Component {
  
    render() {
        return (
            <React.Fragment>
            <tr>
            <th scope="row">#</th>
            <td>{this.props.Layout.name}</td>
            <td> {this.props.Layout.user.id===1 ? <Link to={`/edit/${this.props.Layout.id}`} className="btn btn-warning btn-sm"><i className="fa fa-edit"/></Link>: null} </td>
          </tr>
          
          </React.Fragment>
        )
    }
}

export default TableItem
