import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockSharpIcon from '@material-ui/icons/LockSharp';
import EmailIcon from '@material-ui/icons/Email';
import TextFieldGroup from '../base/text-field-group';
import { signupValidator } from '../../utils';
import { FullPageLoader } from '../loaders';
import { userAlreadyExists, registerUser } from '../../actions';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '580px',
        marginTop: theme.spacing(4)
    },
    root: {
        display: 'grid',
        gridTemplateRows: 'repeat(4, minmax(2.5rem, 1fr))',
        [theme.breakpoints.down('sm')]: {
            gridTemplateRows: 'repeat(6, minmax(2.5rem, 1fr))'
        },
        gridTemplateColumns: 'repeat(2 minmax(250px, 1fr))',
        gridGap: '20px',
        width: '95%',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        overflow: 'hidden',
        marginBottom: theme.spacing(3)
    },
    inputBox: {
        outline: 'none',
        borderRadius: theme.spacing(2),
        border: 'none',
        fontSize: '1rem',
        paddingLeft: '0.8rem',
        height: '2.5rem',
        width: '100%'
    },
    username: {
        gridColumn: 'span 2'
    },
    firstname: {
        gridColumn: 'span 1',
        [theme.breakpoints.down('sm')]: {
            gridColumn: 'span 2'
        }
    },
    lastname: {
        gridColumn: 'span 1',
        [theme.breakpoints.down('sm')]: {
            gridColumn: 'span 2'
        }
    },
    email: {
        gridColumn: 'span 2'
    },
    password: {
        gridColumn: 'span 1',
        [theme.breakpoints.down('sm')]: {
            gridColumn: 'span 2'
        }
    },
    confirmPassword: {
        gridColumn: 'span 1',
        [theme.breakpoints.down('sm')]: {
            gridColumn: 'span 2'
        }
    },
    textFieldClass: {
        display: 'flex',
        alignItems: 'center',

        width: '100%',
        overflow: 'hidden'
    },
    submit: {
        [theme.breakpoints.down('sm')]: {
            // gridRow: '7 / 8'
        }
    }
}));

const reducer = (initialState, finalState) => {
    return { ...initialState, ...finalState };
};

const SignupForm = ({ userAlreadyExists, history, registerUser }) => {
    const classes = useStyles();

    const [state, setState] = useReducer(reducer, {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleId: 2,
        errors: {},
        submitting: false,
        invalid: false
    });

    const handleInputChange = e => {
        setState({ [e.target.name]: e.target.value });
    };

    const isValid = () => {
        const {
            username,
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        } = state;

        const payload = {
            username,
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        };
        const { errors, isValid } = signupValidator(payload);
        return !isValid ? setState({ errors }) : isValid;
    };

    const checkUserExists = e => {
        const { name: field, value: val } = e.target;
        if (val !== '') {
            userAlreadyExists(val).then(response => {
                const { errors } = state;
                let invalid;
                if (response.data.user) {
                    errors[field] = `A user already exists with that ${field}`;
                    invalid = true;
                } else {
                    errors[field] = '';
                    invalid = false;
                }
                setState({ errors, invalid });
            });
        }
    };

    const fields = {
        username: state.username,
        firstname: state.firstname,
        lastname: state.lastname,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword
    };

    const atLeastOneEmptyField = Object.values(fields).some(
        item => !item.trim().length
    );

    const handleSubmit = e => {
        const {
            username,
            firstname,
            lastname,
            email,
            password,
            roleId
        } = state;

        e.preventDefault();

        if (isValid()) {
            setState({ errors: {}, submitting: true });

            const payload = {
                username,
                firstname,
                lastname,
                email,
                password,
                roleId
            };

            registerUser(payload)
                .then(
                    () => {
                        setState({
                            submitting: false
                        });
                        history.push('/');
                    },
                    err => {
                        setState({
                            errors: err.response.data,
                            submitting: false
                        });
                    }
                )
                .catch(err => {
                    console.log('Error after registering', err);
                });
        }
    };

    const {
        errors,
        password,
        submitting,
        invalid,
        username,
        email,
        firstname,
        lastname,
        confirmPassword
    } = state;

    return submitting ? (
        <FullPageLoader />
    ) : (
        <div className={classes.wrapper}>
            <form className={classes.root}>
                <TextFieldGroup
                    icon={<FaceIcon />}
                    error={errors.username}
                    onChange={handleInputChange}
                    onBlur={checkUserExists}
                    value={username}
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
                    value={firstname}
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
                    value={lastname}
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
                    checkUserExists={checkUserExists}
                    value={email}
                    field="email"
                    type="email"
                    inputClass={classes.inputBox}
                    fieldClass={`${classes.email} ${classes.textFieldClass} `}
                    placeholder="Email"
                />
                <TextFieldGroup
                    icon={<LockOutlinedIcon />}
                    error={errors.password}
                    onChange={handleInputChange}
                    value={password}
                    field="password"
                    name="password"
                    type="password"
                    inputClass={classes.inputBox}
                    fieldClass={`${classes.password} ${classes.textFieldClass} `}
                    placeholder="Password"
                />
                <TextFieldGroup
                    icon={<LockSharpIcon />}
                    error={errors.confirmPassword}
                    onChange={handleInputChange}
                    value={confirmPassword}
                    field="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    inputClass={classes.inputBox}
                    fieldClass={`${classes.confirmPassword} ${classes.textFieldClass} `}
                    placeholder="Confirm Password"
                />
            </form>
            <button
                disabled={submitting || invalid || atLeastOneEmptyField}
                className={`${classes.submit} btn btn-default`}
                type="button"
                onClick={handleSubmit}
            >
                REGISTER
            </button>
        </div>
    );
};

SignupForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    userAlreadyExists: PropTypes.func.isRequired,
    history: PropTypes.object
};

export default withRouter(
    connect(null, {
        registerUser,
        userAlreadyExists
    })(SignupForm)
);
