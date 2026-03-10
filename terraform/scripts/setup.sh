#!/bin/bash

sudo apt-get update -y

curl -fsSL https://get.docker.com | sudo sh

sudo systemctl start docker
sudo systemctl enable docker

sudo apt-get install -y docker-compose

sudo apt-get install -y git

cd /home/azureuser

git clone https://github.com/CMareesG/Customer-Feedback-MS.git

cd Customer-Feedback-MS

sudo docker-compose up -d