# Server Setup
sudo dnf install http
systemctl start httpd
sudo systemctl enable httpd
sudo yum install net-tools
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http
firewall-cmd --add-service=https
chcon -R --reference=/var/www/html /std-volume
chgrp -R apache /std-volume
chmod -R g+r /std-volume
# DocumentRoot --> /std-volume
nano /etc/httpd/conf/httpd.conf 
systemctl restart httpd
sudo yum install iotop