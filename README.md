**Usage:**

Kills unhealthy containers, and reports docker engine health to ELB.

Basic:
```bash
docker run -d -v /var/run/docker.sock:/tmp/docker.sock ecs-watchdog
```

Environment variables supported:
CHECK_INTERVAL=60
HEALTH_CHECK_PATH=/health-check
HEALTH_CHECK_PORT=80

