#!/bin/bash

echo "Installing podfeeder Dependencies"
sudo apt-get update
# Install the required packages via apt-get
echo "Installing xsltproc"
sudo apt-get -y install xsltproc
echo "Credits for the original ideá and a few lines in here goes to http://github.com/buzink for original podcast2playlist-solution with xsltproc, but most of the stuff is almost reborn"
echo "Fixing dat .sh-script, of course!"
sudo chmod +x /data/plugins/music_service/podfeeder/rss2playlist.sh
sudo chmod +x /data/plugins/music_service/podfeeder/cron_add.sh
sudo chmod +x /data/plugins/music_service/podfeeder/cron_remove.sh

# If you need to differentiate install for armhf and i386 you can get the variable like this
#DPKG_ARCH=`dpkg --print-architecture`
# Then use it to differentiate your install
echo "!!!TESTING PART BELOW!!! - Let's generate it, cause... Why not?"

#requred to end the plugin install
echo "plugininstallend"


## WORKING AREA
#echo "READ THIS: Note that all \" characters will be replaced with \` cause this character is breaking the .json format"
## Replace
##sed -i '/PLFOLDER=/c\This line is removed by the admin.' rss2playlist.sh
##With command: sed -i '/PLFOLDER=/c\PLFOLDER="'$(pwd)'"' rss2playlist.sh
##PLFOLDER="/data/playlist"
#Anders http://www.spreaker.com/user/9196262/episodes/feed
#Mads og.. http://www.dr.dk/mu/Feed/mads-monopolet-podcast.xml?format=podcast&limit=15
#Morten Resen - Startup;http://mortenresen.libsyn.com/rss