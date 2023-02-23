import {server, PORT} from './crudAPI/app';
import cluster from 'cluster';
import { cpus } from 'node:os';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
    console.log(`Master process #${process.pid} started\n`);

    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        worker.setMaxListeners(5);
    }

    cluster.on('disconnect', ()=>{
        cluster.fork()
    })

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {
    server.listen(PORT,()=>{
        console.log('Server running on port '+PORT);
        console.log(`Worker with id ${process.pid} started`);
    })
}
