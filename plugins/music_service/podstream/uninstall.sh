#!/bin/bash

echo "Uninstalling podstream dependencies"
sudo rm -Rf /data/plugins/music_service/podstream/
sudo rm -Rf /data/podstream/
sudo rm -f /etc/systemd/system/podstream.service

echo " Removing podstream configuration file"
sudo rm -Rf /data/configuration/music_service/podstream/

echo "Done"
echo "pluginuninstallend"
