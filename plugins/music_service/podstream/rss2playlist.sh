#!/bin/bash
PLFOLDER="/data/playlist"
TEMPLATE="volumio.xsl"


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
