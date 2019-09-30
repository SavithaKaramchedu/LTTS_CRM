#!/bin/sh

#systemd service will execute this shell script
cd /home/ubuntu
cd .
node sys_index_keymgr.js > ./sys_keymgr.log 2>&1
