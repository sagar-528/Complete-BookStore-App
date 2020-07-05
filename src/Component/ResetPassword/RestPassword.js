import React, { Component } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices();
export class RestPassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            toggle: false,
            confirmToggle: false, 
            password: '',
            confirmPassword: ''
        }
    }
    
    async componentDidMount() {
        var currentUrl = window.location.href;
        console.log(currentUrl,"url from window")
        var token = currentUrl.slice(36)
        await console.log(token)
        localStorage.setItem("token", token)
    }

    SetNewPassword = async (e) => {
        await this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    }

    SetConfirmPassword = async (e) => {
        await this.setState({
            confirmPassword: e.target.value
        })
        console.log(this.state.confirmPassword)
    }

    SubmitPassoword = async() => {
        if (this.state.password === this.state.confirmPassword) {
           await data.resetPassword(this.state.password)
            await this.setState({
                confirmToggle: true
            })
            localStorage.removeItem("token");
        }
        else {
            await this.setState({
                toggle: true
            })
            window.location.reload(true)
        }
    }
    render() {
        return (
            <div>
                 <div>
                    <Container maxWidth="xs" style={{ marginTop:'50px', marginBottom:'110px' }}>
                        <CssBaseline />
                            <div >
                            <Avatar style={{marginLeft:'170px',marginBottom:'10px', backgroundColor: '#3d5afe'}}>
                                <AccountCircleIcon />
                            </Avatar>
                             <Typography component="h1" variant="h5" style={{marginLeft:'110px', marginBottom:"10px"}}>
                                 Reset Password
                            </Typography>
                            <form noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="New Password"
                                    autoFocus
                                    onChange={(e) => this.SetNewPassword(e)}
                                />
                                 <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    autoFocus
                                    onChange={(e) => this.SetConfirmPassword(e)}
                                />
                                 <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            {this.state.confirmToggle ? 
                            <Redirect to="/UserLogin" style={{ marginTop:'20px', textDecoration: 'none' }} />:
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{marginBottom:'10px'}}
                                onClick={this.SubmitPassoword}
                            >
                                Confirm
                            </Button>}
                            </form>
                        </div>
                    </Container>
            <div style={{marginTop: '40px'}}>
        </div>
        {this.state.toggle ?
                    window.alert("Enter Password Doesn't Match.")
                : null }
    </div>
            </div>
        )
    }
}

export default RestPassword
