import {server, PORT} from './crudAPI/app';


server.listen(PORT, ()=>{
    console.log('server running in port '+PORT);
})

process.on('SIGINT', ()=>{
    server.close(err=>{
        console.log('some error server');
    })
})