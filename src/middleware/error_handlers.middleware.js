// TODO: move them to middleware
// catch 404 and forward to error handler
function not_found_exception(req, res, next) {
    res.status(404).json({
        message: "This route does not exist!"
    })
};

// error handler
function exception_handler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.status === 400 ? err.message : err.stack
    })
};

module.exports = {
    not_found_exception,
    exception_handler,
}