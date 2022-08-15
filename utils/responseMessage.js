module.exports = {
    missingValue: (params) => {
        return `${params} are required.`;
    },
    notFound: (params) => {
        return `${params} not found.`;
    },
    unauthorized: () => {
        return "You are not Authorized."
    }
}