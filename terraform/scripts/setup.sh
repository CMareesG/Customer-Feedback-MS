#!/bin/bash

sudo apt-get update -y

curl -fsSL https://get.docker.com | sudo sh
sudo systemctl start docker
sudo systemctl enable docker

sudo apt-get install -y docker-compose

sudo apt-get install -y git

curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

az login --identity

cd /home/testadmin

git clone -b test-dev https://github.com/CMareesG/Customer-Feedback-MS.git

cd Customer-Feedback-MS

DATABASE_URL=$(az keyvault secret show --vault-name kv-cfms1 --name database-url --query value -o tsv)
JWT_SECRET=$(az keyvault secret show --vault-name kv-cfms1 --name jwt-secret --query value -o tsv)
JWT_EXPIRES_IN=$(az keyvault secret show --vault-name kv-cfms1 --name jwt-expires-in --query value -o tsv)
REFRESH_EXPIRES_IN=$(az keyvault secret show --vault-name kv-cfms1 --name refresh-expires-in --query value -o tsv)

echo "DATABASE_URL=$DATABASE_URL" > .env
echo "JWT_SECRET=$JWT_SECRET" >> .env
echo "JWT_EXPIRES_IN=$JWT_EXPIRES_IN" >> .env
echo "REFRESH_EXPIRES_IN=$REFRESH_EXPIRES_IN" >> .env

sudo docker-compose up -d