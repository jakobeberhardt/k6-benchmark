# HTTP benchmarking using k6
This repository provides:
- Setup instructions for an HTTP benchmarking environment and result visualization using [k6](https://k6.io/docs/) and [Grafana](https://grafana.com/).
- Scripts to generate suitable test data. 
- Configurable k6 script including different load scenarios.
- Predefined Grafana dashboard for load and result visualization.  

## Generate test files on designated HTTP server
    # 30000 files with 500KB
    bash gen.sh 30000 500 ./files
    chgrp -R apache ./files
    chmod -R g+r ./files
---
## Run a simple HTTP benchmark with console output
    # Add target ip to script.js
    k6 run script.js

---
## Grafana Dashboard

In case you want to set up a local InfluxDB and or a local Grafana server, follow the instructions in **client.sh**. Import the Dashboard to visualize key metrics like errors per second, the amount of concurrent requests or the median request response time. Go to:
    
    Create --> Import --> Upload dashboard.json -> Select InfluxDB as the data source

## Run an HTTP benchmark and write output to local InfluxDB 
    # Add target ip to script.js
    k6 run --out influxdb=http://localhost:8086/mydb script.js 
