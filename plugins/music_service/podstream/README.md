[![GitHub version](https://badge.fury.io/gh/exetico%2Fvolumio-plugins.svg)](https://badge.fury.io/gh/exetico%2Fvolumio-plugins)

# Stream Podcasts on Volumio (Create playlist with rss-feeds)
This is in a very early state, but you are welcome to look into how it looks.

## What is this?
It allows you to stream podcasts and other content stored in rss format.

### Thumbsnails
Images is provided and listed left to the podcast-episode, if it's provided in the source. Currenlty i'm only looking into the "itunes:image" format (or any other dat ending with `:image`) like: `<itunes:image href="http://static.libsyn.com/p/assets/6/2/7/d/627d856fee180d97/Morten-Resen-podcast-cover-art.jpg" />`

## Playlists
The plugin generates playlists based on the rss-feeds. The lists will be visible in "Browse" > "Playlists". Currenlty the playlists isn't removed if you change the source to something else (See to-do)

The data is stored in the `/data/playlist' folder in Volumios preffered format (JSON).

## To-do/Known issues:
- Create .timer for the .service, so it's triggered every 2. hours fx.
- Allow the user to edit the frequency of the update-interval (on hour-basis) in the Volumio-configs
- Look into a easy way to handle the rssfeed-stuff. Should i go with an table-kinda thing? (I can't find anything like this, in the Volumio GUI at the moment), or should i go with an simple solution like allowing to referate to an pastebin-file or something like that?
- Store playlists in own folder, so it's possibe to remove the playlists when removing the plugin, or do something else? Also think about making a clean-function, if a foldes will be created.
- Fixing the loading bar somethings ending at 70%, but with the "Plugin Successfully Installed" message is showing up. I'm not sure whether it's a problem in the `install.sh`-file, or the Volumio Plugin-handling.

## Credits
- Thanks to volspotconnect for the structure of the solution. I couldnt' find out how is was working.
- Thanks to buzink for the original podcast-playlist structure, idea and solution (It's now hardly changed, cleaned up, and multiple options is removed)