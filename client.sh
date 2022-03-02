# Setup instructions for a k6 benchmarking client along with an optional InfluxDB and Grafana dashboard
# k6 for load testing https://github.com/grafana/k6
sudo dnf install -y https://dl.k6.io/rpm/repo.rpm    
sudo dnf install -y k6

# In case you plan to use a local InfluxDB https://www.influxdata.com/:
cat <<EOF | sudo tee /etc/yum.repos.d/influxdb.repo
[influxdb]
name = InfluxDB Repository - RHEL \$releasever
baseurl = https://repos.influxdata.com/rhel/\$releasever/\$basearch/stable
enabled = 1
gpgcheck = 1
gpgkey = https://repos.influxdata.com/influxdb.key
EOF

sudo yum install influxdb
sudo firewall-cmd --add-port=8086/tcp --permanent
sudo firewall-cmd --reload
sudo systemctl start influxdb


# In case you plan to run Grafana locally https://grafana.com/:
sudo nano /etc/yum.repos.d/grafana.repo
[grafana]
name=grafana
baseurl=https://packages.grafana.com/enterprise/rpm
repo_gpgcheck=1
enabled=1
gpgcheck=1
gpgkey=https://packages.grafana.com/gpg.key
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt

sudo dnf install grafana
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
sudo firewall-cmd --add-port=3000/tcp --permanent
sudo firewall-cmd --reload