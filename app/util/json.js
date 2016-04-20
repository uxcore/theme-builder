exports.success = (data) => {
    return {
        hasError: false,
        content: data
    };
};
exports.error = (msg) => {
    return {
        hasError: true,
        content: msg
    };
};