import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingDock: {
        animation: '$rotate 3s linear infinite',
        height: '100px',
        width: '100px'
    },
    circleOne: {
        display: 'inline-block',
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: 'purple',
        transform: 'scale(0)',
        animation: '$grow 1.5s linear infinite',
        margin: '-5px'
    },
    circleTwo: {
        display: 'inline-block',
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: 'palevioletred',
        transform: 'scale(0)',
        animation: '$grow 1.5s linear infinite',
        animationDelay: '0.75s',
        margin: '-5px'
    },
    circleThree: {
        display: 'inline-block',
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        backgroundColor: 'rgb(49, 150, 175)',
        transform: 'scale(0)',
        animation: '$grow 1.5s linear infinite',
        animationDelay: '1s'
    },
    '@keyframes rotate': {
        to: {
            transform: 'rotate(360deg)'
        }
    },
    '@keyframes grow': {
        '50%': {
            transform: 'scale(1)'
        }
    }
}));

const FullPageLoader = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.loadingDock}>
                <div className={classes.circleOne} />
                <div className={classes.circleTwo} />
                <div className={classes.circleThree} />
            </div>
        </div>
    );
};

export default FullPageLoader;
