#!/bin/sh

#systemd service will execute this shell script
cd /home/ubuntu
cd .
node index.js > ./app_sampleservice.log 2>&1
