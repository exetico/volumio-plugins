#!/bin/bash
PLUGINDIR="/data/plugins/music_service/podstream"
PLFOLDER="/data/podstream/"
TEMPLATE="volumio.xsl"
UnwantedCharacters="&"

echo "[PODSTREAM - rss2playlist_service.sh] Let's go - Here goes the podcast train"
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
  albumartname=${filename//$UnwantedCharacters/}".jpg"
  "[PODSTREAM - rss2playlist_service.sh] Looking for albumart..."
  if [ ! -f "$PLUGINDIR/albumart/$albumartname" ];
    then
      echo "[PODSTREAM - rss2playlist_service.sh] Image from: $f | Export to: $PLUGINDIR/albumart/$albumartname"
      grep -o '<url>[^<]*' "$filename".rss | grep -o '[^>]*$' | xargs wget -O "$PLUGINDIR/albumart/$albumartname" -c
    else
      echo "[PODSTREAM - rss2playlist_service.sh] Image already downloaded to the albumart-folder: $albumartname"
  fi
  echo "[PODSTREAM - rss2playlist_service.sh] Converting rss file - $f"
  xsltproc -o "$PLFOLDER"/"$filename" "$TEMPLATE" "$f"
  rm "$filename".rss
done
