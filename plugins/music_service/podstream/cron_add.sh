#!/bin/bash
cronname="podfeeder-update"
croncmd="/data/plugins/music_service/podstream/rss2playlist.sh"
cronjob="0 * * * * $croncmd"

mkdir -p /etc/cron.hourly
echo "$cronjob" > /etc/cron.hourly/"$cronname"
