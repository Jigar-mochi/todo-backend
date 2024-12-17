const yup = require('yup');

const registerUserSchema = yup.object().shape({
    fullName: yup.string().required('Full name is required').min(3, 'Full name must be at least 3 characters'),
    userName: yup.string().required('User name is required').min(3, 'User name must be at least 3 characters'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});
const notesValidationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
});

module.exports = { registerUserSchema, notesValidationSchema };