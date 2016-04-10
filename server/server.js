import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import http from 'http';
import fs from 'fs';
import config from './../config';
import helpers from './helpers';
import CachemanFile from 'cacheman-file';
import Walker from './walker';

const app = express();
const cache = new CachemanFile({ttl: 3600, tmpDir: path.join(__dirname, '../storage/cache')});
const walker = new Walker();

app.use(compression());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../static')));
app.use(helpers.allowCrossDomain);

app.set('port', helpers.normalizePort(config.server.port));

app.get(`/${config.server.base_url}/resources`, (req, res) => {
    cache.get('artists', (cacheError, value) => {
        if (cacheError) throw cacheError;
        if (!value) {
            walker.music(walker.artist(path.join(__dirname, '../static/resources/artists')),
                (data) => {
                    cache.set('artists', data, (error) => {
                        if (error) throw error;
                        return res.status(200).send({
                            status: 200,
                            status_text: 'OK',
                            cache: false,
                            data,
                        });
                    });
                }
            );
        }

        return res.status(200).send({
            status: 200,
            status_text: 'OK',
            cache: true,
            data: value,
        });
    });
});

app.get(`/${config.server.base_url}/plays`, (req, res) => {
    if (req.query.path) {
        const stat = fs.statSync(req.query.path);

        res.writeHead(200, {
            'Content-Type': 'audio/mp3',
            'Content-Length': stat.size,
        });

        const readStream = fs.createReadStream(req.query.path);
        return readStream.pipe(res);
    }

    return res.status(200).send({
        status: 400,
        status_text: 'Bad Request',
        error: 'path in query string required',
    });
});

export default http.createServer(app);
