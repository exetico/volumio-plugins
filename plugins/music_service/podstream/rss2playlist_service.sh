#!/bin/bash
PLUGINDIR="/data/plugins/music_service/podstream"
PLFOLDER="/data/playlist"
TEMPLATE="volumio.xsl"

echo "Let's go - Here goes the podcast train"
cd $PLUGINDIR
#ls
#tail rssfeeds

#download rss feeds
while read p; do
  echo "${p%;*}"
  echo "${p##*;}"
  wget "${p##*;}" -O "${p%;*}".rss      
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
