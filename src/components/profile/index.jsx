import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import { getUserInfo, updateUserInfo } from '../../actions';
import TextFieldGroup from '../base/text-field-group';

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'hidden',

        marginTop: theme.spacing(8),
        [theme.breakpoints.up('sm')]: {
            display: 'grid',
            gridTemplateRows: 'repeat(2, minmax(2.5rem, 1fr))',
            gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
            gridGap: '25px'
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    form: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(92px, 1fr))',
        gridGap: '20px',

        backgroundColor: '#CDCDCD',
        overflow: 'hidden',

        width: '100%',
        padding: theme.spacing(2),

        [theme.breakpoints.up('sm')]: {
            gridColumn: '2 / 3'
        }
    },
    inputBox: {
        outline: 'none',
        borderRadius: theme.spacing(2),
        border: '2px solid cornflowerblue',
        fontSize: '1rem',
        paddingLeft: '0.8rem',
        height: '2.5rem',
        width: '100%'
    },
    username: {
        gridColumn: 'span 3'
    },
    firstname: {
        gridColumn: 'span 3'
    },
    lastname: {
        gridColumn: 'span 3'
    },
    email: {
        gridColumn: 'span 3'
    },
    textFieldClass: {
        display: 'flex',
        alignItems: 'center',

        width: '100%',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    submit: {
        gridColumn: '2 / 3',
        width: '100%'
    }
}));

const Profile = ({ getUserDetails, userDetails, updateUserDetails }) => {
    const classes = useStyles();

    const [user, setUser] = useState({});
    const [updatePayload, setUpdatePayload] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        getUserDetails(userDetails.id).then(() => {
            setUser(userDetails);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(userDetails)]);

    const handleInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setUpdatePayload({ ...updatePayload, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        await updateUserDetails(user.id, updatePayload);
        setSubmitting(false);
    };

    const atLeastOneFieldEmpty = Object.values(user).some(
        val => !String(val).trim().length
    );

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextFieldGroup
                    icon={<FaceIcon />}
                    error={errors.username}
                    onChange={handleInputChange}
                    value={user.username}
                    field="username"
                    name="username"
                    type="text"
                    inputClass={classes.inputBox}
                    fieldClass={`${classes.username} ${classes.textFieldClass} `}
                    placeholder="Username"
                />

                <TextFieldGroup
                    icon={<PermIdentityIcon />}
                    error={errors.firstname}
                    onChange={handleInputChange}
                    value={user.firstname}
                    field="firstname"
                    name="firstname"
                    type="text"
                    inputClass={classes.inputBox}
                    fieldClass={`${classes.firstname} ${classes.textFieldClass} `}
                    placeholder="First Name"
                />

                <TextFieldGroup
                    icon={<AccountCircleIcon />}
                    error={errors.lastname}
                    onChange={handleInputChange}
                    value={user.lastname}
                    field="lastname"
                    name="lastname"
                    type="text"
                    inputClass={classes.inputBox}
                    fieldClass={`${classes.lastname} ${classes.textFieldClass} `}
                    placeholder="Last Name"
                />

                <TextFieldGroup
                    icon={<EmailIcon />}
                    error={errors.email}
                    onChange={handleInputChange}
                    value={user.email}
                    field="email"
                    type="email"
                    inputClass={classes.inputBox}
                    fieldClass={`${classes.email} ${classes.textFieldClass} `}
                    placeholder="Email"
                />

                <button
                    disabled={submitting || atLeastOneFieldEmpty}
                    className={`btn btn-default ${classes.submit}`}
                    type="submit"
                >
                    UPDATE
                </button>
            </form>
        </div>
    );
};

Profile.propTypes = {
    userDetails: PropTypes.object,
    updateUserDetails: PropTypes.func,
    getUserDetails: PropTypes.func
};

const mapStateToProps = state => ({
    userDetails: state.user.details
});

export default connect(mapStateToProps, {
    getUserDetails: getUserInfo,
    updateUserDetails: updateUserInfo
})(Profile);
