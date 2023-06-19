const digits = "0123456789";
const digitsLength = digits.length;

export default (length: number = 6) => {
    let code = "";

    for (let i = 0; i < length; i++) {
        code += digits.charAt(Math.floor(Math.random() * digitsLength));
    }

    return code;
};
