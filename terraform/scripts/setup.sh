#!/bin/bash
apt-get update
apt-get install -y docker.io docker-compose
systemctl start docker
systemctl enable docker
usermod -aG docker testadmin

cd /home/testadmin
git clone -b prod https://github.com/CMareesG/Customer-Feedback-MS.git

cd /home/testadmin/Customer-Feedback-MS

DATABASE_URL=$(az keyvault secret show --vault-name kvcfms --name database-url --query value -o tsv)
JWT_SECRET=$(az keyvault secret show --vault-name kvcfms --name jwt-secret --query value -o tsv)
JWT_EXPIRES_IN=$(az keyvault secret show --vault-name kvcfms --name jwt-expires-in --query value -o tsv)
REFRESH_EXPIRES_IN=$(az keyvault secret show --vault-name kvcfms --name refresh-expires-in --query value -o tsv)

cd /home/testadmin/Customer-Feedback-MS/customer-feedback-backend

echo "DATABASE_URL=$DATABASE_URL" > .env
echo "JWT_SECRET=$JWT_SECRET" >> .env
echo "JWT_EXPIRES_IN=$JWT_EXPIRES_IN" >> .env
echo "REFRESH_EXPIRES_IN=$REFRESH_EXPIRES_IN" >> .env

cd /home/testadmin/Customer-Feedback-MS

sudo docker-compose up -d