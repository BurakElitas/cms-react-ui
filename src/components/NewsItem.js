import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class NewsItem extends Component {

   

    render() {
        const {news}=this.props;
        return (
            <React.Fragment>
            <tr>
            <th scope="row">#</th>
            <td>{news.title}</td>
            <td>{news.layout.name}</td>
            <td>{news.category.name}</td>
            <td><Link to={`/publish/${news.layout.id}/news/${news.id}`} className="btn btn-warning btn-sm"><i className="fa fa-edit"/></Link></td>
          </tr>
          
          </React.Fragment>
        )
    }
}


export default NewsItem
