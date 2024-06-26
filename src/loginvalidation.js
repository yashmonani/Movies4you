function validation(values) {
    let errors = {};
    
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (values.email === "") {
        errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Invalid email format";
    }

    if (values.password === "") {
        errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password must contain at least 8 characters, one uppercase, one lowercase letter, and one digit";
    }

    return errors;
}

export default validation;
