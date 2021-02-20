import React, { Component } from "react";
import "./Header.css";
import Fastfood from '@material-ui/icons/Fastfood';
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
const styles = {
  root: {
    color: "#FFFFFF"
  },
  searchInput: {
    width: "80%",
    color: "white"
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 32,
  },
  formControl: {
    width: "90%"
  }
}
const TabContainer = function (props) {
  return (
    <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      value: 0,
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      mobile: "",
      passwordReg: "",
      usernameRequired: "dispNone",
      passwordRequired: "dispNone",
      loginError: "dispNone",
      signupError: "dispNone",
      emailRequired: "dispNone",
      firstnameRequired: "dispNone",
      lastnameRequired: "dispNone",
      mobileRequired: "dispNone",
      passwordRegRequired: "dispNone",
      registrationSuccess: false,
      signUpErrorMsg: "",
      signUpErrCode: "",
      loginInvalidContactNo: "",
      loginErrCode: "",
      loginErrorMsg: "",
      loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
      showUserProfileDropDown: false,
      open: false,
      anchorEl: null,
      snackBarOpen: false,
      snackBarText: "",
      menuIsOpen: false
    }
  }

  // Storing signup input field values in state for processing
  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value })
  }
  inputPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value })
  }
  inputEmailChangeHandler = (e) => {
    this.setState({ email: e.target.value })
  }
  inputFirstnameChangeHandler = (e) => {
    this.setState({ firstname: e.target.value })
  }
  inputLastnameChangeHandler = (e) => {
    this.setState({ lastname: e.target.value })
  }
  inputMobileChangeHandler = (e) => {
    this.setState({ mobile: e.target.value })
  }
  inputPasswordRegChangeHandler = (e) => {
    this.setState({ passwordReg: e.target.value })
  }

  componentDidMount() {
  }

  //Login function
  loginClickHandler = () => {
    //Clearing error texts during login
    this.setState({ loginInvalidContactNo: "" })

    //Checking if any input fields are empty
    this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
    this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
    this.state.loginErrorMsg === "" ? this.setState({ loginError: "dispBlock" }) : this.setState({ loginError: "dispNone" });
    
    //If username and password both are null we return
    if (this.state.username === "" || this.state.password === "") { return }
    let tempContactNo = this.state.username;
    //Checking if the contact number is a 10 digit number or not
    var reg = new RegExp('^[0-9]+$');
    if (tempContactNo.length !== 10 || !reg.test(tempContactNo)) {
      this.setState({ loginInvalidContactNo: "Invalid Contact" })
      return;
    }

    
  }
 

  //Sign up function
  signUpClickHandler = () => {
    //clear error messages
    this.setState({ signUpErrorMsg: "" });
    this.setState({ signUpErrCode: "" });
    //Checking if any input fields are empty
    this.state.email === "" ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
    this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
    this.state.mobile === "" ? this.setState({ mobileRequired: "dispBlock" }) : this.setState({ mobileRequired: "dispNone" });
    this.state.passwordReg === "" ? this.setState({ passwordRegRequired: "dispBlock" }) : this.setState({ passwordRegRequired: "dispNone" });
    if (this.state.email === "" || this.state.firstname === "" || this.state.mobile === "" || this.state.passwordReg === "") { return; }

    let that = this;
    let dataSignup = {
      'first_name': this.state.firstname,
      'last_name': this.state.lastname,
      'email_address': this.state.email,
      'password': this.state.passwordReg,
      'contact_number': this.state.mobile,
    };

    
  }

//Function invoked when Modal is opened
  openModalHandler = () => {

    //Clearing input field values and all error texts when freshly opening the modal
    this.setState({ modalIsOpen: true });
    this.setState({ value: 0 });
    this.setState({ email: "" });
    this.setState({ firstname: "" });
    this.setState({ lastname: "" });
    this.setState({ mobile: "" });
    this.setState({ signUpErrorMsg: "" });
    this.setState({ signUpErrCode: "" });
    this.setState({ passwordReg: "" });
    this.setState({ loginInvalidContactNo: "" });
    this.setState({ loginErrCode: "" });
    this.setState({ loginErrorMsg: "" });
    this.setState({ usernameRequired: "dispNone" });
    this.setState({ passwordRequired: "dispNone" });
    this.setState({ loginError: "dispNone" });
    this.setState({ signupError: "dispNone" });
    this.setState({ emailRequired: "dispNone" });
    this.setState({ firstnameRequired: "dispNone" });
    this.setState({ lastnameRequired: "dispNone" });
    this.setState({ mobileRequired: "dispNone" });
    this.setState({ passwordRegRequired: "dispNone" });
    this.setState({ loginErrorMsg: "" });
  }

  // Closing modal afer login
  // Opening snack bar with message
  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
    this.setState({ snackBarOpen: true });
  }

  // Closing modal due to click away
  // This does trigger a snack bar
  closeModalHandlerClickAway = () => {
    this.setState({ modalIsOpen: false });
    this.setState({ snackBarOpen: false });
  }

  // For toggling between Login and Signup tab in the modal
  tabChangeHandler = (event, value) => {
    this.setState({ value });
  }

  


  render() {
    const { classes } = this.props;
    let logoToRender = null;
    logoToRender = (
      <Fastfood className={classes.icon} />
    )

    return (
      <div className="topMain">
        <div className="header-main-container">
          <div className="header-logo-container">{logoToRender}</div>
          
            <div className="header-search-container">
              <div className="search-icon">
                <SearchIcon style={{ color: "#FFFFFF" }} />
              </div>
              <Input
                
                className={classes.searchInput}
                placeholder="Search by Restaurant Name"
              />
            </div>
          
          {!this.state.loggedIn ?
            <div>
              <Button style={{ fontSize: "100%" }} variant="contained" color="default" onClick={this.openModalHandler}>
                  {/* <AccountCircle /> */}
                  <span style={{ marginLeft: "2%" }}>Login</span></Button>
            </div>
            :
            <div>
              <Button style={{ textTransform: "capitalize", fontSize: "120%", background: " #263238", color: "lightgrey" }} onClick={this.openMenuHandler}>
                  {/* <AccountCircle /> */}
                  <span style={{ paddingLeft: "3%" }}>  {sessionStorage.getItem("firstName")}</span></Button>
              <div>
                <Menu
                  className="menuDrop"
                  id="simple-menu"
                  keepMounted
                  open={this.state.menuIsOpen}
                  onClose={this.closeMenuHandler}
                  anchorEl={this.state.anchorEl}>
                  <MenuItem onClick={this.handleClose}><Link to="/profile" style={{ textDecoration: 'none', color: "black" }}>My Profile</Link></MenuItem>
                  <MenuItem onClick={this.props.logoutHandler}>Logout</MenuItem>
                </Menu>

              </div>
            </div>}
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandlerClickAway}
          style={customStyles}>
          <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
            <Tab label="LOGIN" />
            <Tab label="SIGNUP" />
          </Tabs>
          {this.state.value === 0 &&
            <TabContainer>

              <FormControl required className={classes.formControl}>

                <InputLabel htmlFor="username"> Contact No. </InputLabel>
                <Input id="username" type="text" username={this.state.username} value={this.state.username} onChange={this.inputUsernameChangeHandler} />
                <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                <Typography variant="subtitle1" color="error" align="left">{this.state.loginInvalidContactNo}</Typography>
               
                {this.state.loginErrCode === "ATH-001" ?
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle1" color="error" className={this.state.loginError} align="left">{this.state.loginErrorMsg}</Typography>
                  </FormControl> : ""}

              </FormControl><br /><br />

              <FormControl required className={classes.formControl}>

                <InputLabel htmlFor="password"> Password </InputLabel>
                <Input id="password" type="password" value={this.state.password} onChange={this.inputPasswordChangeHandler} />
                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>

                {this.state.loginErrCode === "ATH-002" ?
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle1" color="error" className={this.state.loginError} align="left">{this.state.loginErrorMsg}</Typography>
                  </FormControl> : ""}

              </FormControl><br /><br />              
              <Button variant="contained" color="primary" onClick={this.loginClickHandler} className={classes.formControl}>LOGIN</Button>
            </TabContainer>}

          {this.state.value === 1 && <TabContainer>
            <form>
              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="firstname">First Name</InputLabel>
                <Input id="firstname" type="text" onChange={this.inputFirstnameChangeHandler} value={this.state.firstname} />
                <FormHelperText className={this.state.firstnameRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                <Input id="lastname" type="text" onChange={this.inputLastnameChangeHandler} value={this.state.lastname} />
                <FormHelperText className={this.state.lastnameRequired}><span className="red">required</span></FormHelperText>
              </FormControl><br /><br />

              <FormControl required className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" type="email" onChange={this.inputEmailChangeHandler} value={this.state.email} />
                <FormHelperText className={this.state.emailRequired}><span className="red">required</span></FormHelperText>
                {this.state.signUpErrCode === "SGR-002" ?
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle1" color="error" className={this.state.signupError} align="left">Invalid Email</Typography>
                  </FormControl> : ""}
              </FormControl><br /><br />

              <FormControl required aria-describedby="name-helper-text" className={classes.formControl}>
                <InputLabel htmlFor="passwordReg">Password</InputLabel>
                <Input type="password" id="passwordReg" value={this.state.passwordReg} onChange={this.inputPasswordRegChangeHandler} />
                <FormHelperText className={this.state.passwordRegRequired}><span className="red">required</span></FormHelperText>
                {this.state.signUpErrCode === "SGR-004" ?
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle1" color="error" className={this.state.signupError} align="left">Password must contain at least one capital letter, one small letter, one number, and one special character</Typography>
                  </FormControl> : ""}
              </FormControl><br /><br />

              <FormControl required className={classes.formControl}>

                <InputLabel htmlFor="mobile">Contact No.</InputLabel>
                <Input id="mobile" type="number" onChange={this.inputMobileChangeHandler} value={this.state.mobile} />
                <FormHelperText className={this.state.mobileRequired}><span className="red">required</span></FormHelperText>

                {this.state.signUpErrCode === "SGR-003" ?
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle1" color="error" className={this.state.signupError} align="left">Contact No. must contain only numbers and must be 10 digits long</Typography>
                  </FormControl> : ""}

                {this.state.signUpErrCode === "SGR-001" ?
                  <FormControl className={classes.formControl}>
                    <Typography variant="subtitle1" color="error" className={this.state.signupError} align="left">{this.state.signUpErrorMsg}</Typography>
                  </FormControl> : ""}
              </FormControl>
              <br /><br /><br /><br />
              <Button variant="contained" color="primary" onClick={this.signUpClickHandler} className={classes.formControl}> SIGNUP </Button>
            </form>
          </TabContainer>}
        </Modal>
        
      </div>
    );
  }
}
export default withStyles(styles)(Header);