const Docker = require('dockerode');

let docker = new Docker({ socketPath: '/var/run/docker.sock' });

setTimeout(() => {
    docker.listContainers({}, (err, containers) => {
       for (let c of containers) {
           if (c.Status.indexOf('(unhealthy)') !== -1) {
               let container = docker.getContainer(c.Id);
               container.stop().then(() => {
                   return container.remove();
               }).then(() => {
                   console.log(`Successfully stopped unhealthy container: ${c.Image}.`);
               }).catch(() => {
                   console.log(`Failed to stop unhealthy container: ${c.Image}.`);
               })
           }
       }
    });
}, 30000);