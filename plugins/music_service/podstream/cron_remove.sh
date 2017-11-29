#!/bin/bash
cronname="podfeeder-update"
croncmd="/data/plugins/music_service/podstream/rss2playlist.sh"
cronjob="0 * * * * $croncmd"

rm -f /etc/cron.hourly/"$cronname"
