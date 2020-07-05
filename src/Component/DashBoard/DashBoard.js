import React from 'react';
import Headerbar from '../Header/Headerbar';
import Footer from "../Footer/Footer";
import Gridview from '../GridView/Gridview';
import Pagination from '../Pagination/Pagination';
import Lowerbar from '../Lowerbar/Lowerbar';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import HTTPService from '../../HTTPServices'
import { withRouter } from 'react-router';
import App from '../../App';


var book = new HTTPService();
class DashBoard extends React.Component {

constructor(props) {
    super(props)
    this.state = {
      cartBookCount: "",
      wishBookCount: "",
        books: [],
        cartCount: 0,
        wishCount: 0,
        pageOfItems: []
    }
    this.setbooks = this.setbooks.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
}

onChangePage(pageItems) {
  // update state with new page of items
  this.setState({ pageOfItems: pageItems });
  console.log(this.state.pageOfItems,'page');
}

 componentDidMount() {
     
    book.fetchgetAllBook(response => {
        console.log(response)
        this.setState({
            books: response
        })
    })
    book.fetchAllCartBook(response =>{
        this.setState({
            cartBookCount: response.length
          })
          console.log(this.state.cartBookCount, "bookscount");
    })
    
    book.fetchAllWishlistBooks(response => {
        this.setState({
          wishBookCount: response.length
        })
        console.log(this.state.wishBookCount,"wishlistcount"); 
      });
}

setbooks(newbooks) {
    console.log('dashboard',newbooks);
    console.log('hi',this);
    this.setState({
        books: newbooks
    })
    console.log('bind',this.state.books)
}

setSearch(searchbook){
    console.log('dashboard',searchbook);
    console.log('hi',this);
    this.setState({
        books: searchbook
    })
    console.log('bind',this.state.books)
}
    render() {
        return (
            <div>
                <Headerbar function={this.setSearch} cartBookCount={this.state.cartBookCount} wishBookCount={this.state.wishBookCount}/>
                <div style={{ width: '74%', margin: 'auto' }}>
                <Lowerbar data={this.state.books.length} function={this.setbooks}/>
                <Gridview data={this.state.pageOfItems} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%', marginTop: '2%' }}>
                <Pagination items={this.state.books} onChangePage={this.onChangePage}/>
                </div>
                <Footer />
            </div>
        );
    }

}

export default DashBoard