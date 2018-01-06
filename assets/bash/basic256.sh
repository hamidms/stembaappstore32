#!/bin/bash
#installer aplikasi Basic256
sudo apt-get install -f basic256 -y

if [ $? -eq 0 ]; then
    echo OK
else
    echo FAIL
fi
