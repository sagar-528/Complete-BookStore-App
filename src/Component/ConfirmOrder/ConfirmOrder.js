import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./ConfirmOrder.scss"
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import orderImage from '../../Assets/confirm.jpg';
import Headerbar from '../Header/Headerbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices();
export class ConfirmOrder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            orderId: ''
        }
    }
    
    componentDidMount() {
        data.OrderId(response => {
            console.log("id: ", response)
            this.setState({
                orderId: response
            })
        })
    }

    render() {
        return (
            <div>
                <Headerbar />
                <div className="mainDiv">
                    <div className="orderImage">
                        <img src={orderImage} />
                    </div>
                    <div className="orderMessage">
                        <p className="messageParagraph"> hurray!!!your order is confirmed</p>
                        <p className="messageParagraph">the order id is #{this.state.orderId} save the order id</p>
                        <p className="messageParagraph">for further communication..</p>
                    </div>

                    <div className="userDataTable">
                        <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                                <TableHead >
                                    <TableRow style={{ fontWeight: 'bold', backgroundColor: '#fafafa' }}>
                                        <TableCell align="center">Email us</TableCell>
                                        <TableCell align="center">Contact us</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">admin@bookStore.com </TableCell>
                                        <TableCell align="center">9876543210</TableCell>
                                        <TableCell align="center">bridgelabz mumbai.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div className="continueShoopingButton">
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }} >
                        <Button variant="contained" color="primary">
                            CONTINUE SHOPPING
                        </Button>
                    </Link>
                    </div>
                </div>
                <div>
                <Footer />
                </div>
            </div>
        )
    }
}

export default ConfirmOrder
