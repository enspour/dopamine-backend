// (?=.*[0-9]) - Assert a string has at least one number;
// (?=.*[!@#$%^&*]) - Assert a string has at least one special character.

const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export default regex;
