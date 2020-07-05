import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
        fontFamily: 'Arial, Helvetica, sans- serif',
        fontSize: '12px',
        marginLeft: '80px'
    },
    
    footer: {
        backgroundColor: "#4e342e"
    },
}));
function Footer() {
    const classes = useStyles();
    return (
       <div className={classes.root}>
            <AppBar position="static" className={classes.footer}>
                <Toolbar>
                    <Typography variant="h8" className={classes.title}>
                        Copyright © 2020, Bookstore Private Limited. All Rights Reserved.
          </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Footer
