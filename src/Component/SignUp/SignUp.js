import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import HTTPServices from '../../HTTPServices';

var data = new HTTPServices();
export class SignUp extends Component {
    
constructor(props) {
  super(props)
  this.state = {
    email: '',
    password: '',
    username: '',
    phoneNo: '',
    role: [], 
    admin: false,
    user: false,
   
  }
}

handleSetEmail = async(e) => {
  console.log(e.target.value)
  console.log(this.state.email)
  await this.setState({
      email: e.target.value     
  })
  console.log("email", this.state.email);
  
}

handleSetPassword = async(e) => {
 await this.setState({
      password: e.target.value     
  })
  console.log('password',this.state.password);
  
}

handleSetUsername = async(e) => {
 await this.setState({
      username: e.target.value     
  })
  console.log('Username',this.state.username);
  
}

handleSetPhoneNumber = async(e) => {
 await this.setState({
      phoneNo: e.target.value     
  })
  console.log('phoneno.',this.state.phoneNo);
}

handleSelectAdmin = () => {
  this.setState({
      admin: !this.state.admin
  })
  console.log('admin',this.state.admin);
}

handleSelectUser = async() => {
  this.setState({
      user: !this.state.user
  })
  console.log('user',this.state.user); 
}

handleSubmitSignUpData = () => {
  if (this.state.admin)
  this.setState({
      role: this.state.role.push("admin")
  })
  console.log(this.state.role);
  
  if (this.state.user)
  this.setState({
      role: this.state.role.push("user")
  })
  console.log(this.state.role);
  console.log("beforeAPI", this.state.email)
  console.log(this.state.role,"roles");
  
  data.signUpData(this.state.username,  this.state.password, this.state.email, this.state.phoneNo, this.state.role)
}
  render() {
    return (
      <div>
          <Container component="main" maxWidth="xs" style={{ marginTop:'50px', marginBottom:'110px' }}>
            <CssBaseline />
          <div >
            <Avatar style={{marginLeft:'170px',marginBottom:'10px', backgroundColor: '#3d5afe'}}>
              <AccountCircleIcon />
            </Avatar>
              <Typography component="h1" variant="h5" style={{marginLeft:'150px', marginBottom:'15px'}}>
                Sign up
              </Typography>
            <form noValidate>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                name="Name"
                autoComplete="Name"
                style={{ outlineColor: 'coral' }}
                onChange={(e) => this.handleSetUsername(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Phone Number"
                name="Phone no."
                autoComplete="Phone Number"
                style={{ outlineColor: 'coral' }}
                onChange={(e) => this.handleSetPhoneNumber(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="emailId"
                autoComplete="email"
                style={{ outlineColor: 'coral' }}
                onChange={(e) => this.handleSetEmail(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password" 
                style={{ outlineColor: 'coral' }}
                onChange={this.handleSetPassword}
              />
            </Grid>
          </Grid>
                    <span>
                        <input type="checkbox" id="type" value="Admin" onChange={this.handleSelectAdmin}/>
                        <label for="type"  style={{ padding: "10px"}}> Admin</label>
                        <input type="checkbox" id="type" value="User"  onChange={this.handleSelectUser} />
                        <label for="type"  style={{ padding: "10px"}} > User</label>
                    </span>
          <Link to="/UserLogin" style={{ textDecoration: 'none' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:'10px',marginBottom:'10px'}}
            onClick={this.handleSubmitSignUpData}
          >
            Sign Up
          </Button>
          </Link>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/UserLogin" style={{ textDecoration: 'none' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
            </div>
        )
    }
}

export default SignUp
