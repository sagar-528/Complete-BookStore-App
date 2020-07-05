import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import './Book.scss'
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HTTPServices from '../../HTTPServices';
import { connect } from 'react-redux';


var book = new HTTPServices();
export class Bookview extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             bookList: [],
            cartCount: 0,
            wishCount: 0,
             cardHover: false
        }
        this.handleOnHoverCard = this.handleOnHoverCard.bind(this)
    }

    handleOnHoverCard = (e) => {
        console.log("onHover Description");
        this.setState({
            cardHover: !this.state.cardHover
        })        
    }

    handleClickAddToCart = async(e) => {
       await book.addToCart(e, 1)
        console.log("Add Book To Cart", e);
        await book.fetchAllCartBook(response => {
            this.props.dispatch({ type: "cartUpdate", payload: response.length })
        })
    }

handleClickAddToWishList = async(e) => {
          await book.addToWishList(e)
            console.log("Add Book To WishList", e);
            await book.fetchAllWishlistBooks(response => {
                this.props.dispatch({ type: "wishListUpdate", payload: response.length })
            })
        }

    render() {
        return (  
                <div onMouseEnter= {this.handleOnHoverCard} onMouseLeave={this.handleOnHoverCard}>
                    <Card className="info" variant="outlined">
                    <CardActionArea>
                        <div className="divName">
                            <img src={this.props.data.picPath} width="100px" height="130px" ></img>
                        </div>

                    </CardActionArea>
                    <div className="BookDetail">
                        <div className="BookTitle">
                            <span>{this.props.data.nameOfBook}</span>
                        </div>
                        <div className="BookAuthor">
                            <span>by {this.props.data.author}</span>
                        </div>
                        <div className="BookPrice">
                            <span>Rs. {this.props.data.price}</span>
                        </div>
                    </div>

                    <div className="BookButtons">
                        <Button variant="outlined" style={{ backgroundColor: '#A03037', color: 'white', width: '40%', height: '10%', fontSize: '10px' }}
                        onClick={() => this.handleClickAddToCart(this.props.data.id)} > buynow</Button>
                    <Button variant="outlined" style={{ width: '40%', height: '10%', fontSize: '10px' }}
                    onClick={() => this.handleClickAddToWishList(this.props.data.id)}> wishlist </Button>
                    </div>
                    <Card className="bookInfo" variant="outlined">
                        <CardContent>
                            <Typography color="textPrimary" style={{ fontFamily: 'Arial', fontSize: 16, fontWeight: 600 }} gutterBottom>
                                Book Detail
                            </Typography>
                            <Typography color="textSecondary" style={{ fontSize: 10, textAlign: 'initial'}} gutterBottom>
                                {this.props.data.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cartCount: state.cartCount,
    wishListCount: state.wishListCount
});

export default connect(mapStateToProps)(Bookview)
