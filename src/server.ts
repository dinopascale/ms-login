import * as express from 'express';

async function startServer() {
    const app = express();
    await require('./loaders').default({expressApp: app});

    app.listen(3000, err => {
        if (err) {
            console.log(err);
            process.exit(1);
            return;
        }
        console.log('Server Listening on port 3000')
    })
}

startServer();