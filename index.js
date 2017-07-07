const Docker = require('dockerode');

let docker = new Docker({ socketPath: '/tmp/docker.sock' });

const restartMode = !!process.env.RESTART_MODE;
const restartImages = process.env.RESTART_IMAGES ? process.env.RESTART_IMAGES.split(',') : [];

setInterval(() => {
    docker.listContainers({}, (err, containers) => {
       for (let c of containers) {
           if (c.Status.indexOf('(unhealthy)') !== -1) {
               let container = docker.getContainer(c.Id);

               if (restartMode || restartImages.indexOf(c.Image)
               ) {
                   container.restart().then(() => {
                       console.log(`Successfully restarted unhealthy container: ${c.Image}.`);
                   }).catch(() => {
                       console.log(`Failed to restart unhealthy container: ${c.Image}.`);
                   });
               } else {
                   container.stop().then(() => {
                       return container.remove();
                   }).then(() => {
                       console.log(`Successfully stopped unhealthy container: ${c.Image}.`);
                   }).catch(() => {
                       console.log(`Failed to stop unhealthy container: ${c.Image}.`);
                   });
               }
           }
       }
    });
}, (process.env.CHECK_INTERVAL || 30) * 1000);

const port = process.env.HEALTH_CHECK_PORT || 80;
const path = process.env.HEALTH_CHECK_PATH || '/health-check';
const express = require('express');
const app = express();

app.get(path, (request, response) => {
    response.sendStatus(200);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Failed to start ECS watchdog', err)
    }

    console.log(`ECS watchdog is listening on ${port}`)
});