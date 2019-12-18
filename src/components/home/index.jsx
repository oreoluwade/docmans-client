import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    },
    title: {
        color: 'white',
        letterSpacing: '0.2rem'
    }
});

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>DOCUMENT MANAGEMENT SYSTEM</h1>
        </div>
    );
};

export default Home;
