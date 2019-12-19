import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        width: '25rem',
        overflow: 'hidden',
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },

    input: {
        fontSize: '1.5rem',
        width: '100%',
        padding: '0.3rem',
        border: '2px solid rgb(49, 150, 175)',
        borderRadius: '0.8rem',
        outline: 'none'
    }
}));

const Search = ({ query, handleQueryChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                value={query}
                onChange={handleQueryChange}
                className={classes.input}
                placeholder="Search..."
            />
        </div>
    );
};

Search.propTypes = {
    query: PropTypes.string,
    handleQueryChange: PropTypes.func
};

export default Search;
