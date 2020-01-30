import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home';
import Edit from './Edit'
import Publish from './Publish'
import Deneme from './Deneme'
import New from './New'
import ShowNews from './ShowNews';


export default()=>{
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route component={Home} path="/home"/>
                    <Route component={Edit} path="/edit/:layoutId"/>
                    <Route component={New} path="/news"/>
                    <Route component={ShowNews} path="/showNews"/>
                    <Route component={Publish} path="/publish/:layoutId/news/:newsId"/>
                    <Route component={Deneme} path="/deneme/:layoutId"/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}