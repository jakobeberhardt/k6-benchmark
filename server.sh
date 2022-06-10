# Instructions for setting up a httpd server on CentOS 8
dnf install http
systemctl start httpd
systemctl enable httpd
dnf install net-tools
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --add-service=http
firewall-cmd --add-service=https
chcon -R --reference=/var/www/html ./files
chgrp -R apache ./files
chmod -R g+r ./files
# DocumentRoot --> ./files
nano /etc/httpd/conf/httpd.conf 
systemctl restart httpd