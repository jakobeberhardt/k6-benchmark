# HTTP benchmarking using k6

This repository provides:
- Setup instructions for an HTTP benchmarking environment and result visualization using **k6** and **Grafana**.
- Scripts to generate suitable test data. 
- Configurable k6 script including different load scenarios.
- Predefined Grafana dashboard for load and result visualization.  

## Generate test files of different sizes on designated HTTP server (Total of 16 GB)
    bash gen.sh 100000 40 ./tiny && \
    bash gen.sh 10000 400 ./small && \
    bash gen.sh 1000 4000 ./medium && \
    bash gen.sh 100 40000 ./large && \
    bash gen.sh 10 200000 ./extra 
    chgrp -R apache /data && \
    chmod -R g+r /data
---
## Run simple a HTTP benchmark with console output
    k6 run script.js

---
## Dedicated Grafana Dashboard

In case you want to set up a local InfluxDB and or a local Grafana server, follow the instructions in **client.sh**. Import the Dashboard to visualize key metrics like errors per second, the amount of concurrent requests or the median request response time. Go to:
    
    Create --> Import --> Upload dashboard.json or enter the Dashboard ID 2587 -> Select InfluxDB as the data source

## Run a HTTP benchmark and write output to local InfluxDB 
    k6 run --out influxdb=http://localhost:8086/mydb script.js 
