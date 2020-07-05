import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import Headerbar from '../Header/Headerbar'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import HTTTPServices from '../../HTTPServices'
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import './WishList.scss'


var data = new HTTTPServices();
export class WishList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             wishlistBooks: [],
             wishBookCount: "",
        }
    }
    
         componentDidMount() {
            data.fetchAllWishlistBooks( async response => {
                console.log(response)
                this.setState({
                    wishlistBooks: response
                })
                    this.props.dispatch({ type: "wishListUpdate", payload: this.state.wishlistBooks.length })
            })
             data.fetchAllCartBook(response => {
                this.props.dispatch({ type: "cartUpdate", payload: response.length })
            })
        }
    
        handleRemovebooks = (e) =>{
            data.removeBookFromWishList(101, e)
            console.log("sagar", e);
            window.location.reload(false);
        }
    
        handleBookToCart = async(e) =>{
           await data.addToCart( e, 1)
            console.log("sagar", e);
             data.fetchAllCartBook( async response => {
                this.props.dispatch({ type: "cartUpdate", payload: response.length })
            })
          await data.removeBookFromWishList(101, e)
            window.location.reload(false);
        }
    
    render() {
        return (
            <div>
                <Headerbar />
                <div className="wishCart">
                <Card className="Card">
                    <div className="myCart">My WishList ({this.state.wishlistBooks.length}) </div>
                        <div className="box">
                            {this.state.wishlistBooks.map(book => (
                                <div className="cart">
                                    <div key={book.id}>
                                        <img className="bookImages" src={book.picPath}/>
                                    </div>
                                    <div style={{ marginLeft: '5%' }}>
                                        <Typography className="cartTitle" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '450' }}>{book.nameOfBook}</Typography>
                                        <Typography className="cartAuthor" style={{ fontSize: '10px' }}>{book.author}</Typography>
                                        <Typography className="cartPrice" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600' }}>Rs. {book.price}</Typography>
                                        <div>
                                            <Button color="primary" style={{ marginLeft: '350px'}} onClick={() => this.handleRemovebooks(book.id)}>Remove</Button>
                                            <Button color="primary" onClick={() => this.handleBookToCart(book.id)}>Add to Cart</Button>
                                        </div>
                                    </div>
                               </div>
                            ))}
                        </div>
                </Card>
            </div>
            <Footer />
        </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cartCount: state.cartCount,
    wishListCount: state.wishListCount
  });

  
export default  connect(mapStateToProps)(WishList);
