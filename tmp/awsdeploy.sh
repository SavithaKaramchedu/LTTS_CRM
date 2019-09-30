bash /mnt/d/27-09-2019/cirruswave/tmp/prepcopy.sh
pwdsave=$(pwd)
cd /mnt/d/27-09-2019/cirruswave/tmp1/docker-pc-wave
tar -czf /mnt/d/27-09-2019/cirruswave/tmp1/docker-pc-launch/pcw.tar.gz .
cd $pwdsave
# -------------------------------------------
# Setting up machine 0
# -------------------------------------------
ssh -i  /root/.ssh/isv_key_pair.pem ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com sudo "curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -"
ssh -i  /root/.ssh/isv_key_pair.pem ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com sudo apt-get install -y nodejs
scp -i /root/.ssh/isv_key_pair.pem /mnt/d/27-09-2019/cirruswave/tmp1/docker-pc-launch/pcw.tar.gz ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com:~
ssh -i  /root/.ssh/isv_key_pair.pem ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com tar -xzf pcw.tar.gz -C . --strip-components 1
scp -i /root/.ssh/isv_key_pair.pem /mnt/d/27-09-2019/cirruswave/tmp1/aws_setup.sh ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com:~
# Copying service files to home directory
  # Copying sampleservice
    scp -i /root/.ssh/isv_key_pair.pem /mnt/d/27-09-2019/cirruswave/tmp1/sampleservice.service ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com:/home/ubuntu
    scp -i /root/.ssh/isv_key_pair.pem /mnt/d/27-09-2019/cirruswave/tmp1/sampleservice.bash ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com:/home/ubuntu
  # Copying keymgr
    scp -i /root/.ssh/isv_key_pair.pem /mnt/d/27-09-2019/cirruswave/tmp1/docker-pc-launch/sys_index_keymgr.js ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com:/home/ubuntu
    scp -i /root/.ssh/isv_key_pair.pem /mnt/d/27-09-2019/cirruswave/tmp1/keymgr.service ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com:/home/ubuntu
    scp -i /root/.ssh/isv_key_pair.pem /mnt/d/27-09-2019/cirruswave/tmp1/keymgr.bash ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com:/home/ubuntu
ssh -i  /root/.ssh/isv_key_pair.pem ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com npm install
ssh -i  /root/.ssh/isv_key_pair.pem ubuntu@ec2-13-235-127-88.ap-south-1.compute.amazonaws.com bash aws_setup.sh
rm /mnt/d/27-09-2019/cirruswave/tmp1/docker-pc-launch/pcw.tar.gz
