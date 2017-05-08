**Usage:**


Basic:
```bash
docker run -d -v /var/run/docker.sock:/tmp/docker.sock ecs-watchdog
```

Specify health check interval:
```bash
docker run -d -v /var/run/docker.sock:/tmp/docker.sock -e "CHECK_INTERVAL=60" ecs-watchdog
```

