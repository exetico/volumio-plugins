#!/bin/bash
echo "Installing podstream dependencies"
sudo apt-get update
sudo apt-get -y install xsltproc

echo "Credits for the plugin-structure goes to balbuze's volspotconnect"
echo "Credits for the original podcast-playlist structure and solution goes to github.com/buzink"
echo "...for original podcast2playlist-solution with xsltproc, but most of the stuff is almost reborn"

#echo "Chmod script"
#chmod +x /data/plugins/music_service/podstream/rss2playlist.sh

echo "Checking if podstream service exists"
if [ ! -f "/etc/systemd/system/podstream.service" ];
	then
		echo "file podstream.service doesn't exist, creating"
		cd /data/plugins/music_service/podstream/
		sudo tar -xvf podstream.service.tar -C /
	else
		echo "podstream.service already exists. Nothing to do !"
fi

#required to end the plugin install
echo "plugininstallend"