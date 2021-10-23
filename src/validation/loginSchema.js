import * as yup from 'yup';

const loginSchema = yup.object().shape({
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
        .min(6, "Passwords must be at least 6 characters long")
});

export default loginSchema;