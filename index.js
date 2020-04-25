const app = require('express')();
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const {port, betaAddress, frontendServer} = require('./config');

app.use(cookieParser());

/** Handle requests to ATSD */
app.use('/api', proxy(betaAddress, {
        https: false,
        proxyReqPathResolver: (req) => {
            return "/api" + req.url;
        }
    })
);

/** Handle requests to random.js */
app.use('/', proxy(frontendServer, {
        https: false,
        proxyReqPathResolver: (req) => {
            return req.url;
        }
    }),
);

app.listen(port);
