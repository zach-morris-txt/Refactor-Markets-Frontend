import * as yup from 'yup';

const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters long')
        .max(25, "First name must be less or equal than 25 characters long"),
    lastName: yup
        .string()
        .trim()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters long')
        .max(50, "Last name must be less or equal than 50 characters long"),
    email: yup
        .string()
        .trim()
        .email('Must be a valid email address')
        .required('Email is required'),
    username: yup
        .string()
        .trim()
        .required('User name is required')
        .min(3, 'User name must be at least 3 character long')
        .max(50, "User name must be less or equal than 50 characters long"),
    password: yup
        .string()
        .trim()
        .required("Password is Required")
        .min(6, "Passwords must be at least 6 characters long"),
    confirmPassword: yup
        .string()
        .trim()
        .oneOf([yup.ref("password")], 'Passwords must match'),
});

export default registerSchema;