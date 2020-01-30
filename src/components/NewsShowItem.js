import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class NewsShowItem extends Component {

    render() {
        const {news}=this.props;

        return (
            <React.Fragment>
            <div className="col-md-4 mt-1">
            <div className="card" style={{width: "18rem"}}>
                <img src="http://www.bigeasydesarucoast.com/wp-content/uploads/2019/09/news-1.jpg"  className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                </div>
            
                <div className="card-body">
                <Link to={`/news/${news.id}`} className="card-link btn btn-primary">Habere Git</Link>
                </div>
             </div>
             </div>
             </React.Fragment>
        )
    }
}


export default NewsShowItem
