# k6-benchmark

### Run simple HTTP benchmark with console output
    k6 run --discard-response-bodies --no-thresholds script.js
### Run a HTTP benchmark and write to local influxdb 
    k6 run --out influxdb=http://localhost:8086/mydb --discard-response-bodies --no-thresholds --no-summary script.js 
