import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import TextFieldGroup from '../base/text-field-group';
import { loginValidator } from '../../utils';
import { login } from '../../actions/authenticationAction';
import { FullPageLoader } from '../loaders';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'repeat(3, minmax(2.5rem, 1fr))',
        gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))',
        gridGap: '25px',
        overflow: 'hidden',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginTop: theme.spacing(8),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(15)
        }
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
    identifier: {
        gridColumn: 'span 3'
    },
    password: {
        gridColumn: 'span 3'
    },
    textFieldClass: {
        display: 'flex',
        alignItems: 'center',

        width: '100%',
        overflow: 'hidden'
    },
    submit: {
        gridColumn: '2 / 3',
        width: '100%'
    }
}));

const reducer = (initialState, finalState) => {
    return { ...initialState, ...finalState };
};

const LoginForm = ({ history, login }) => {
    const classes = useStyles();

    const [state, setState] = useReducer(reducer, {
        identifier: '',
        password: '',
        errors: {},
        submitting: false
    });

    const isValid = () => {
        const { identifier, password } = state;
        const { errors, isValid } = loginValidator({ identifier, password });
        return !isValid ? setState({ errors }) : isValid;
    };

    const handleSubmit = e => {
        const { identifier, password } = state;
        e.preventDefault();
        if (isValid() === true) {
            setState({ errors: {}, submitting: true });
            login({ identifier, password })
                .then(() => {
                    history.push('/dashboard');
                })
                .catch(err => {
                    setState({
                        submitting: false,
                        errors: err.response.data.error
                    });
                });
        } else {
            console.log('Invalid login data', isValid());
        }
    };

    const handleInputChange = e => {
        setState({ [e.target.name]: e.target.value, errors: '' });
    };

    const { errors, identifier, password, submitting } = state;

    const emptyFields = !identifier.trim().length || !password.trim().length;

    return submitting ? (
        <FullPageLoader />
    ) : (
        <form className={classes.root}>
            <TextFieldGroup
                icon={<AccountCircle />}
                field="identifier"
                label="Username / Email"
                value={identifier}
                error={errors.identifier}
                onChange={handleInputChange}
                type="text"
                placeholder="Username / Email"
                inputClass={classes.inputBox}
                fieldClass={`${classes.identifier} ${classes.textFieldClass} `}
            />

            <TextFieldGroup
                icon={<Lock />}
                field="password"
                label="Password"
                value={password}
                error={errors.password}
                onChange={handleInputChange}
                type="password"
                placeholder="Password"
                inputClass={classes.inputBox}
                fieldClass={`${classes.textFieldClass} ${classes.password}`}
            />

            {errors === 'Invalid Credentials' && (
                <p className="login-form-error">{errors}</p>
            )}

            <button
                disabled={submitting || emptyFields}
                className={`${classes.submit} btn btn-default`}
                type="button"
                onClick={handleSubmit}
            >
                LOGIN
            </button>
        </form>
    );
};

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.object
};

const ConnectedLoginForm = connect(null, { login })(LoginForm);

export default withRouter(ConnectedLoginForm);
