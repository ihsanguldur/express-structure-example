module.exports = {
    success: (res, message, data) => {
        res.status(200).json({
            success: true,
            message,
            data
        });
    },
    error: (res, status, message) =>{
        res.status(status).json({
            success: false,
            message,
            data: null
        });
    },
    sysError: (res, error) => {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}