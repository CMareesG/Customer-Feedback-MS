#!/bin/bash
apt-get update
apt-get install -y docker.io docker-compose
systemctl start docker
systemctl enable docker
usermod -aG docker testadmin