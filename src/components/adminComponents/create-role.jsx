import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { saveRole } from '../../actions';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginBottom: '1rem',
        alignItems: 'center',
        maxWidth: '600px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    input: {
        outline: 'none',
        fontSize: '1rem',
        height: '1.5rem',
        border: '2px solid rgb(80, 143, 202)',
        borderRadius: '1.2rem',
        padding: '0.4rem',
        minWidth: '50%',
        marginRight: '2rem',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: theme.spacing(2),
            marginRight: 0
        }
    },
    button: {
        width: '10rem',
        [theme.breakpoints.down('xs')]: {
            width: '70%'
        }
    }
}));

const CreateRole = ({ saveRole }) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');

    const handleTitleChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const makeNewRole = async e => {
        e.preventDefault();
        await saveRole({ title });
        Swal.fire({
            icon: 'success',
            title: 'New role created',
            showConfirmButton: false,
            timer: 1500
        });
        setTitle('');
    };

    return (
        <div className={classes.root}>
            <input
                type="text"
                value={title}
                placeholder="Enter Role Title"
                onChange={handleTitleChange}
                className={classes.input}
            />
            <button
                type="button"
                onClick={makeNewRole}
                disabled={title.trim().length < 4}
                className={`btn btn-default ${classes.button}`}
            >
                Create Role
            </button>
        </div>
    );
};

CreateRole.propTypes = {
    saveRole: PropTypes.func.isRequired
};

export default connect(null, { saveRole })(CreateRole);
