# k6-benchmark



### Generate test files
    bash gen_same_size.sh 100000 40 ./tiny && \
    bash gen_same_size.sh 10000 400 ./small && \
    bash gen_same_size.sh 1000 4000 ./medium && \
    bash gen_same_size.sh 100 40000 ./large && \
    bash gen_same_size.sh 10  200000 ./extra 


    chgrp -R apache /data && \
    chmod -R g+r /data

### Run simple HTTP benchmark with console output
    k6 run script.js
### Run a HTTP benchmark and write to local influxdb 
    k6 run --out influxdb=http://localhost:8086/mydb --no-summary script.js 