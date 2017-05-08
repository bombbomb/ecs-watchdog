**Usage:**

docker run -d -v /var/run/docker.sock:/tmp/docker.sock ecs-watchdog

docker run -d -v /var/run/docker.sock:/tmp/docker.sock -e "CHECK_INTERVAL=60" ecs-watchdog

