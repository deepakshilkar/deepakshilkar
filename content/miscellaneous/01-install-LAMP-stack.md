---
title: "Installing LAMP stack"
summary: In this article, I will share the steps that I found most effective when installing the LAMP stack on a DigitalOcean droplet.
date: 2023-02-12T00:00:00+05:30
aliases: ["/lamp-stack/"]
tags: ["IT"]
author: "Deepak Shilkar"
draft: false
weight: 1
comments: true
keywords: ["LAMP stack", "Installation", "Web development", "Linux", "Apache", "MySQL", "PHP", "Server setup", "Web server", "Database", "Open-source software", "Technical guide", "Step-by-step instructions", "Web hosting", "System administration"]

---

**Installing the LAMP stack can be a challenge, especially when searching for the right set of instructions that work across different types of servers. In this article, I will share the steps that I found most effective when installing the LAMP stack on a DigitalOcean droplet. Please note that these instructions are specific to DigitalOcean and may not work on other servers.**

# What is LAMP stack?
LAMP stack is a set of open-source software that is used to run dynamic websites and web applications. It consists of the following components:
1. **Linux**: The operating system that runs the server.
2. **Apache**: The web server that handles HTTP requests.
3. **MySQL**: The database management system that stores and retrieves data.
4. **PHP**: The programming language that processes the data and generates dynamic content.

# Why installing LAMP stack can prove challenging sometimes?
The LAMP stack is a popular choice for web developers and system administrators. However, installing it can be a challenge, especially when searching for the right set of instructions that work across different types of servers. In this article, I will share the steps that I found most effective when installing the LAMP stack on a DigitalOcean droplet. Please note that these instructions are specific to DigitalOcean and may not work on other servers.

**N.B.** As you will be logging into the system as root on DigitalOcean, I have omitted the `sudo` command before each command for the sake of simplicity. However, it's important to keep in mind that using sudo is recommended for security reasons when executing commands with elevated privileges. I will be updating this article as I experiment with installing the LAMP stack on different types of servers. It's worth noting that the instructions provided by DigitalOcean's help section are only applicable to older versions of PHP.

**Update the repositories**

`apt update`

`apt upgrade -y`

Install the packages needed for future installations in this tutorial by executing the following command

`apt install ca-certificates apt-transport-https lsb-release gnupg curl nano unzip -y`

Install a package to manage all your repositories. 

`apt install software-properties-common -y` 

Add the PHP 8 repo from ondrej. This repository contains different versions of PHP that are not generally included in your Ubuntu repositories.

`add-apt-repository ppa:ondrej/php`

Again, update the sources.

`apt update`

Install Apache

`apt install apache2 -y`

`ufw allow "Apache Full"`

`mysql_secure_installation`    

Install PHP 

`apt install php8.0 php8.0-cli php8.0-common php8.0-curl php8.0-gd php8.0-intl php8.0-mbstring php8.0-mysql php8.0-opcache php8.0-readline php8.0-xml php8.0-xsl php8.0-zip php8.0-bz2 libapache2-mod-php8.0 -y`

Install MySQL 

`apt install mysql-server`

MySQL installtion

`mysql_secure_installation`

Install phpMyAdmin by changing to the target directory

`cd /usr/share`

Download phpMyAdmin

`wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.zip -O phpmyadmin.zip`

Unzip and clean-up the path

`unzip phpmyadmin.zip`

`rm phpmyadmin.zip`

Rename the directory

`mv phpMyAdmin-*-all-languages phpmyadmin`

Assign permissions. This is especially needed if you are not a root user. 

`chmod -R 0755 phpmyadmin`

 Create an Apache2 configuration file

`nano /etc/apache2/conf-available/phpmyadmin.conf`

```php
# phpMyAdmin Apache configuration

Alias /phpmyadmin /usr/share/phpmyadmin

<Directory /usr/share/phpmyadmin>
    Options SymLinksIfOwnerMatch
    DirectoryIndex index.php
</Directory>

# Disallow web access to directories that don't need it
<Directory /usr/share/phpmyadmin/templates>
    Require all denied
</Directory>
<Directory /usr/share/phpmyadmin/libraries>
    Require all denied
</Directory>
<Directory /usr/share/phpmyadmin/setup/lib>
    Require all denied
</Directory>

<Directory /usr/share/phpmyadmin>
    Options FollowSymLinks
    DirectoryIndex index.php
    AllowOverride All
</Directory>
```

Save the config file and reload apache

`a2enconf phpmyadmin && systemctl reload apache2`

Create a temporary directory for php

`mkdir /usr/share/phpmyadmin/tmp/`

Assign proper privileges

` chown -R www-data:www-data /usr/share/phpmyadmin/tmp/`

Now you can continue with setting up the database and the rest of the procedure. Make sure to create a separate database for phpmyadmin. Also, you need to configure the `config.inc.php` file.

## How to successfully old PHP versions

If you are looking to install a newer version of PHP, you can do so by first performing a clean uninstall of the existing version.

1. **Uninstall PHP**: Open your terminal or command prompt.
   Run the appropriate command based on your operating system. For example, on Ubuntu, you can use:

```shell
#This removes all the php versions installed
 apt remove --purge php*

#Run the following command to remove any remaining configuration files:
 rm -rf /etc/php/

#update
 apt update

```

2. **Install PHP**: Now you can install the version of PHP you want. For example, if you want to install PHP 8.2, you can use:

```shell

 apt install php8.2 php8.2-cli php8.2-common php8.2-curl php8.2-gd php8.2-intl php8.2-mbstring php8.2-mysql php8.2-opcache php8.2-readline php8.2-xml php8.2-xsl php8.2-zip php8.2-bz2 libapache2-mod-php8.2 -y

```

3. Verify the installation by running the following command:

```shell
php -v
```
Voilà! You have successfully installed the desired version of PHP.


I hope you found this article helpful. If you have any questions or suggestions, please feel free to leave a comment below. I will be happy to help you out.
