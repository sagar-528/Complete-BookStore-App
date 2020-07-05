import React, { Component } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices();
export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            emailId: ''
        }
    }
    

    handleEmailAddress = async(e) => {
        await this.setState({
          emailId : e.target.value
        })
        console.log(this.state.emailId);
      }

      handleForgotPassword = () => {
        data.forgotPasswordMail(this.state.emailId)
        console.log(this.state.emailId);
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
                                 Forgot Password
                            </Typography>
                            <form noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => this. handleEmailAddress(e)}
                                />
                                 <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Link to="/ResetPassword/*" style={{ marginTop:'20px', textDecoration: 'none' }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{marginBottom:'10px'}}
                                onClick={this.handleForgotPassword}
                            >
                                Confirm
                            </Button>
                            </Link>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/SignUp" style={{ marginTop:'20px', textDecoration: 'none' }}>
                                         Instead of forget password? Sign Up
                                    </Link>
                                </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>
            <div style={{marginTop: '40px'}}>
        </div>
    </div>
            </div>
        )
    }
}

export default ForgotPassword
