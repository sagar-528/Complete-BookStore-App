import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices
export class Lowerbar extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    
    handleBookSorting = (e) => {
        if (e.target.value === "Price : High to Low")
            data.fetchAllBookDesc(response => {
                console.log('high',response.content)
                this.props.function (response.content) 
                
            })
        else if (e.target.value === "Price : Low to High")
            data.fetchAllBookAsc(response => {
                console.log('low',response.content)
                this.props.function (response.content) 
            })
        else
            data.fetchgetAllBook(response => {
                console.log(response)
                console.log('getbook',response)
                this.props.function (response)
            })
    }

    render() {
        return (
            <p>
            <div >
                <Toolbar>
                    <Typography edge="start" variant="h6" >
                        Books ({this.props.data} Items)
                        <select style={{ marginLeft: '565px', fontSize: '17px' }} onChange={this.handleBookSorting} >
                            <option>Sort by relevance</option>
                            <option >Price : High to Low</option>
                            <option>Price : Low to High</option>
                            <option>Newest Arrivals</option>
                     </select>
                    </Typography>
                    </Toolbar>
               </div>
            </p>
        )
    }
}

export default Lowerbar
