import React, { Component } from 'react'
import './Cart.scss'
import Headerbar from '../Header/Headerbar';
import Footer from '../Footer/Footer';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HTTTPServices from '../../HTTPServices';


var data = new HTTTPServices();
export class Cart extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             booklist: [],
             placeOrder: true,
             customerDetails: false,
             orderSummery: false,
             editbutton: false,
             continue: true,
             fields: {},
             errors: {},
             name: '',
             pincode: '',
             locality: '',
             address: '',
             city: '',
             landmark: '',
             addressType: '',
             home: false,
             work: false,
             other: false,
             orderId: ''
        }
        this.changeEvent = this.changeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setEditable = this.setEditable.bind(this);
        this.checkout = this.checkout.bind(this);
    }

 async componentDidMount() {
     data.fetchAllCartBook(response => {
            console.log(response)
            this.setState({
                booklist: response
            })
            this.props.dispatch({ type: "cartUpdate", payload: this.state.booklist.length })
        })
        await data.fetchAllWishlistBooks(response => {
            this.props.dispatch({ type: "wishListUpdate", payload: response.length })
        })
    }

    handleChangeBookDec(e) {
        let q = e.bookQuantity - 1;
        console.log("value of q ", q)
        data.addToCart( e.id, q)
        window.location.reload(true)
    }

 handleChangeBookInc(e) {
        let q = e.bookQuantity + 1;
        console.log("value of q ", q)
    data.addToCart( e.id, q)
        window.location.reload(true)
    }


    handleRemoveBookFromOrder = (e) =>{
        data.removeBookFromCart(e,1)
        console.log(e);
        window.location.reload(false);
        this.props.dispatch({ type: "cartUpdate", payload: this.state.booklist.length })
    }
    
    setEditable() {
        this.setState({
            disabled: false,
            continue: true,
            orderSummery: !this.state.orderSummery,
            editbutton: !this.state.editbutton
        })
    }
    
    handleChangeEnableCustomerDetails = async() => {
        await data.isCustomerDetailsExisted(response => {
            console.log("result : ", response)
            if (response == 'true') {
             this.setState({
                placeOrder:true,
                customerDetails:false,
                orderSummery:true
            })
            console.log("toggle : ", );
            console.log("summarytoggle : ", );
        }else {
            this.setState({
                placeOrder:false,
                customerDetails:true,
                orderSummery:false
            })
            console.log("toggle123 : ", this.state.toggle);
            console.log("summarytoggle : ", this.state.summaryToggle);
        }
        })

       await this.changeEvent()
    }
 
    changeEvent() {
        this.setState({
            customerDetails: !this.state.customerDetails,
            placeOrder: !this.state.placeOrder,
        })
    }

    handleChange(e) {
        let fields =  this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    
    }
    
    changeEvent() {
        this.setState({
            customerDetails: !this.state.customerDetails,
            placeOrder: !this.state.placeOrder,
        })
        console.log(this.state.customerDetails,"toggle");
        console.log(this.state.placeOrder,'after');
        
        
    }

    checkout() {
        if (this.validateForm()) 
            {
                console.log("form submitted");
                this.setState({
                    orderSummery: !this.state.orderSummery,
                    continue: !this.state.continue,
                    editbutton: !this.state.editbutton
                })
            }
         this.handleChangeEnableOrderSummary();
        }

        validateForm() {
            let fields = this.state.fields;
            let errors = {};
            let formIsValid = true;
    
            if (!fields["name"]) {
                formIsValid = false;
                errors["name"] = "*Please enter your name.";
            }
    
            if (typeof fields["name"] !== "undefined") {
                if (!fields["name"].match(/^[a-zA-Z]{3,}$/)) {
                    formIsValid = false;
                    errors["name"] = "*Please enter alphabet only.";
                }
            }
    
            if (!fields["landmark"]) {
                formIsValid = false;
                errors["landmark"] = "*Please enter your landmark.";
            }
    
            if (typeof fields["landmark"] !== "undefined") {
                if (!fields["landmark"].match(/^[a-zA-Z ]{3,}$/)) {
                    formIsValid = false;
                    errors["landmark"] = "*Please enter valid landmark.";
                }
            }
        
            if (!fields["city"]) {
                formIsValid = false;
                errors["city"] = "*Please enter your city.";
            }
    
            if (typeof fields["city"] !== "undefined") {
                if (!fields["city"].match(/^[a-zA-Z ]{3,}$/)) {
                    formIsValid = false;
                    errors["city"] = "*Please enter valid city.";
                }
            }
    
            if (!fields["address"]) {
                formIsValid = false;
                errors["address"] = "*Please enter your address.";
            }
    
            if (typeof fields["address"] !== "undefined") {
                if (!fields["address"].match(/^[a-zA-Z0-9.,-:() ]{5,}$/)) {
                    formIsValid = false;
                    errors["address"] = "*Please enter valid address.";
                }
            }
    
            if (!fields["locality"]) {
                formIsValid = false;
                errors["locality"] = "*Please enter your locality.";
            }
    
            if (typeof fields["locality"] !== "undefined") {
                if (!fields["locality"].match(/^[a-zA-Z]{3,}$/)) {
                    formIsValid = false;
                    errors["locality"] = "*Please enter valid locality.";
                }
            }
    
            if (!fields["pincode"]) {
                formIsValid = false;
                errors["pincode"] = "*Please enter your pincode.";
            }
    
            if (typeof fields["pincode"] !== "undefined") {
                if (!fields["pincode"].match(/^[0-9]{6}$/)) {
                    formIsValid = false;
                    errors["pincode"] = "*Please enter valid pincode.";
                }
            }
    
            this.setState({
                errors: errors
            });
            return formIsValid;
        }

        handleChangePlaceOrder() {
            data.placeOrder(response => {
                console.log("order id : ", response)
                // this.setState({
                //     orderId: response
                // })
            })
        }

        handleChangeEnableOrderSummary = async () => {

            if (this.state.home) {
                await this.setState({
                    addressType: 'home'
                })
            }
            if (this.state.work) {
                await this.setState({
                    addressType: 'work'
                })
            }
            if (this.state.other) {
                await this.setState({
                    addressType: 'other'
                })
            }
    
            console.log("type", this.state.addressType);
    
            await data.addCustomerDetails(this.state.name, this.state.pincode, this.state.locality, this.state.address, this.state.city, this.state.landmark, this.state.addressType)
            await this.setState({
                summaryToggle: true,
                toggle: false
            })
        }
    
        handleSetName = async(e) => {
            this.setState({
                name: e.target.value
            })
            console.log(this.state.name);
            await this.handleChange(e);
        }
    
        handleSetPincode = async(e) => {
            this.setState({
                pincode: e.target.value
            })
            console.log(this.state.pincode);
            await this.handleChange(e)
        }
    
        handleSetLocality = async (e) => {
            this.setState({
                locality: e.target.value
            })
            console.log(this.state.locality);
            await this.handleChange(e)
        }
    
        handleSetAddress = async(e) => {
            this.setState({
                address: e.target.value
            })
            console.log(this.state.address);
            await this.handleChange(e)
        }
    
        handleSetCity = async(e) => {
            this.setState({
                city: e.target.value
            })
            console.log(this.state.city);
            await this.handleChange(e)
        }
    
        handleSetLandmark = async (e) => {
             this.setState({
                landmark: e.target.value,
            })
            console.log(this.state.landmark);
            await this.handleChange(e)
        }
    
        handleSelectHome = async () => {
            await this.setState({
                work: false,
                home: true,
                other: false
            })
            console.log("home",this.state.home);
            
        }
    
        handleSelectWork = async () => {
            await this.setState({
                work: true,
                home: false,
                other: false
            })
            console.log("work", this.state.work);
        }
    
        handleSelectOther = async () => {
            await this.setState({
                work: false,
                home: false,
                other: true
            })
            console.log("other", this.state.other);
        }

    render() {
        return (
            <div>
            <Headerbar />
                <div className="cardStructure">
                <div className="mainCart">
                <Card className="userCard">
                    <div className="myCart">My Cart ({this.state.booklist.length}) </div>
                        <div className="box">
                            {this.state.booklist.map(book => (
                            <div className="cart">
                                <div>
                                    <img className="bookImages" src={book.picPath}/>
                                </div>
                                    <div style={{ marginLeft: '5%' }}>
                                            <Typography className="cartTitle" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '450' }}>{book.nameOfBook}</Typography>
                                            <Typography className="cartAuthor" style={{ fontSize: '10px' }}>by {book.author}</Typography>
                                            <Typography className="cartPrice" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600' }}>Rs. {book.price}</Typography>
                                        <div>
                                            <RemoveCircleOutlineIcon onClick={() => this.handleChangeBookDec(book)}/>
                                            <input style={{ width: '20px', textAlign: 'center', fontWeight: 'bold', marginLeft: '2px', height: '20px', marginRight: '2px'}} readOnly value={book.bookQuantity}/>
                                            <AddCircleOutlineIcon onClick={() => this.handleChangeBookInc(book)}/>
                                            <Button style={{ marginLeft: '80px' }} onClick={() => this.handleRemoveBookFromOrder(book.id)}>Remove</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="chekoutButton">
                                <Button variant="contained" color="primary" onClick={this.handleChangeEnableCustomerDetails} style={this.state.placeOrder ? { display: 'block' } : { display: 'none' }}>
                                            Place order
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                </div>
                <div>
                <Card className="customerCard" style={this.state.customerDetails ? { minHeight: '630px' } : { height: '60px' }}>
                    <div className="CustomerPage">
                        <Typography className="customerDetails">Customer Details</Typography>
                        <Button onClick={() => this.setEditable()} style={{ fontSize: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }} style={this.state.editbutton ? { display: 'block' } : { display: 'none' }}>Edit</Button>
                    </div>

                    <div style={{marginLeft:'30px'}}>
                        <div>
                            <TextField name="name" label="Name" variant="outlined" value={this.state.fields.name}  style={{ outlineColor: 'coral' }} onChange={(e) => this.handleSetName(e)}/>
                            <div className="errorMsg">{this.state.errors.name}</div>
                        </div>
                    </div><br></br>

                    <div className="textFieldRow">
                        <div>
                            <TextField label="Pincode" variant="outlined" name="pincode" value={this.state.fields.pincode}  onChange={(e) => this.handleSetPincode(e)} />
                            <div className="errorMsg">{this.state.errors.pincode}</div>
                        </div>
                        <div>
                            <TextField label="Locality" variant="outlined" name="locality" value={this.state.fields.locality} onChange={(e) => this.handleSetLocality(e)}/>
                            <div className="errorMsg">{this.state.errors.locality}</div>
                        </div>
                    </div><br></br>

                    <div className="textFieldAddress">
                        <div>
                        <TextField  label="Address" multiline rows="4" name="address" value={this.state.fields.address} 
                        variant="outlined" style={{ width: '472px' }} InputProps={{ disableUnderline: true }} onChange={(e) => this.handleSetAddress(e)}/>
                        <div className="errorMsg">{this.state.errors.address}</div>
                    </div>
                    </div><br></br>

                    <div className="textFieldRow">
                        <div>
                            <TextField label="City" name="city" variant="outlined" value={this.state.fields.city}  onChange={(e) => this.handleSetCity(e)}/>
                            <div className="errorMsg">{this.state.errors.city}</div>
                        </div>
                        <div>
                            <TextField label="Landmark" variant="outlined" name="landmark" value={this.state.fields.landmark}  onChange={(e) => this.handleSetLandmark(e)} />
                            <div className="errorMsg">{this.state.errors.landmark}</div>
                        </div>
                    </div><br></br>

                    <div style={{ width: '92%', margin: 'auto', paddingBottom: '20px' }}>
                        <div >
                            <div className="typeRadio">Type</div>
                            <RadioGroup aria-label="Type" name="type" row>
                                <FormControlLabel value="home" control={<Radio />} label="home"  onChange={this.handleSelectHome}/>
                                <FormControlLabel value="work" control={<Radio />} label="work" onChange={this.handleSelectWork}/>
                                <FormControlLabel value="other" control={<Radio />} label="Other" onChange={this.handleSelectOther}/>
                            </RadioGroup>
                        </div>
                        <div className="placeHolder">
                            <Button variant="contained" color="primary" style={this.state.continue ? { display: 'block' } : { display: 'none' }} onClick={this.checkout}>
                                CONTINUE
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="OrderCart">
                <Card className="lastCard" style={this.state.orderSummery ? { height: '300px' } : { height: '60px' }}>
                    <div className="myCart">Order summery</div>
                        <div className="box">
                            {this.state.booklist.map(book => (
                            <div className="cart">
                                <div key={book.id}>
                                    <img className="bookImages" src={book.picPath}/>
                                </div>
                                    <div style={{ marginLeft: '5%' }}>
                                            <Typography className="cartTitle" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '450' }}>{book.nameOfBook}</Typography>
                                            <Typography className="cartAuthor" style={{ fontSize: '10px' }}>by {book.author}</Typography>
                                            <Typography className="cartPrice" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600' }}>Rs. {book.price * book.bookQuantity}</Typography>
                                            <Typography className="cartPrice" style={{ fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600' }}>Qty. {book.bookQuantity}</Typography>
                                        <div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <div className="chekoutButton">
                            <Link to="/ConfirmOrder" style={{ textDecoration: 'none', color: 'white' }} >
                                <Button variant="contained" color="primary" onClick={this.handleChangePlaceOrder}>
                                    CHECKOUT
                                </Button>
                            </Link>
                        </div>
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

export default connect(mapStateToProps)(Cart);
