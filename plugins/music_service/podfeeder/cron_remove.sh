#!/bin/bash
cronname="podfeeder-update"
croncmd="/data/plugins/music_service/podfeeder/rss2playlist.sh"
cronjob="0 * * * * $croncmd"

rm /etc/cron.hourly/"$cronname"