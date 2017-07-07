**Usage:**

Kills unhealthy containers, and reports docker engine health to ELB.

Basic:
```bash
docker run -d -v -p 80:80 /var/run/docker.sock:/tmp/docker.sock ecs-watchdog
```

Environment variables supported:
CHECK_INTERVAL=60
HEALTH_CHECK_PATH=/health-check
HEALTH_CHECK_PORT=80
RESTART_MODE=0
