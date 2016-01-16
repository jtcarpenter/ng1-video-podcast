# -*- mode: ruby -*-
# vi: set ft=ruby :

@script = <<SCRIPT
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get -y install nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo apt-get -y install npm
SCRIPT

# IP="192.168.33.99" vagrant up

@ip = "192.168.33.22"
if ENV["IP"]
  @ip = ENV["IP"]
end

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  # config.vm.network "private_network", type: "dhcp"
  config.vm.network "private_network", ip: @ip
  # config.vm.forwarded_port 80, 8080
  config.vm.synced_folder "./", "/var/www/videopodcast", type: "nfs"
  config.vm.provision 'shell', inline: @script
  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end
end
