export default {
    allowCrossDomain(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers',
            'Content-Type, Accept, Access-control-allow-headers, Authorization');
        next();
    },

    normalizePort(val) {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }

        if (port >= 0) {
            return port;
        }

        return false;
    },
};

