function validation(values) {
    let errors = {}; // Changed from 'error' to 'errors' for consistency

    // Regex pattern for email validation
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex pattern for password validation
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Name validation
    if (!values.name) {
        errors.name = "Name should not be empty";
    }

    // Email validation
    if (!values.email) {
        errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Invalid email format";
    }

    // Password validation
    if (!values.password) {
        errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit";
    }

    return errors;
}

export default validation;
