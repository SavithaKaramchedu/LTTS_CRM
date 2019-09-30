# bash script to setup all the services
# setting up service sampleservice
    sudo systemctl stop sampleservice
    sudo cp /home/ubuntu/sampleservice.service /lib/systemd/system
    chmod +x sampleservice.bash
    sudo systemctl daemon-reload
    sudo systemctl start sampleservice
    sudo systemctl enable sampleservice
# setting up service keymgr
    sudo systemctl stop keymgr
    sudo cp /home/ubuntu/keymgr.service /lib/systemd/system
    chmod +x keymgr.bash
    sudo systemctl daemon-reload
    sudo systemctl start keymgr
    sudo systemctl enable keymgr
