#!/bin/bash
PLUGINDIR="/data/plugins/music_service/podstream"
PLFOLDER="/data/podstream/"
TEMPLATE="volumio.xsl"

echo "Let's go - Here goes the podcast train"
cd $PLUGINDIR
#ls
#tail rssfeeds

#download rss feeds
while read p; do
  TITLE="${p%;*}"
  URL="${p##*;}"
  URLFixed=${URL//$'\r'/}
  wget "$URLFixed" -O "$TITLE".rss  
done <rssfeeds

#convert rss feeds to playlist
shopt -s nullglob
for f in *.rss
do
  filename=$(basename "$f")
  filename="${filename%.*}"
  echo "Converting rss file - $f"
  xsltproc -o "$PLFOLDER"/"$filename" "$TEMPLATE" "$f"
  rm "$filename".rss
done
