# k6-benchmark

### Run simple HTTP benchmark with console output
    k6 run --discard-response-bodies --no-thresholds script.js
### Run a HTTP benchmark and write to local influxdb 
    k6 run --out influxdb=http://localhost:8086/mydb --discard-response-bodies --no-thresholds --no-summary script.js 


bash gen_same_size.sh 50000 40 ./tiny && bash gen_same_size.sh 10000 400 ./small && bash gen_same_size.sh 1000 4000 ./medium && bash gen_same_size.sh 100 40000 ./large