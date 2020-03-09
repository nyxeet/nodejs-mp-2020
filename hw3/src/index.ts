import server from './server';
import config from './config';


server.listen(config.port, () => console.log(`The app is running on ${config.port} port.`));


process.on('uncaughtException', err => {
    console.log('***uncaughtException***');
    console.log(err);
});

process.on('unhandledRejection', err => {
    console.log('***unhandledRejection***');
    console.log(err);
});
