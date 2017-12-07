[![GitHub version](https://badge.fury.io/gh/exetico%2Fvolumio-plugins.svg)](https://badge.fury.io/gh/exetico%2Fvolumio-plugins)

**IMPORTANT: This plugin isn't ready for regular use, if you expect it to auto-update the playlists.**

**But you are welcome to give it a try, if you're willing to trigger the job yourself. It's pretty easy. There is tree options. (1) Just restart Volumio - (2) Disable and enable the plugin - (3) Press the save-button in options.**

**If you have any improvements to the project, please let me know.** !!

![Podcast icon provided by FontAwesome converted with http://fa2png.io/](https://user-images.githubusercontent.com/3549445/33657348-53f6ba7c-da79-11e7-9997-c4e621461a7a.png)


# Podstream - Stream Podcasts on Volumio
This is still in early state - but you are welcome to give it a try. Please take a look at the [To-do/Known issues](#to-doknown-issues)-section, before issue-submit. Thanks!

### What is this?
It's basicly allows you to stream podcasts and other content stored in rss-format.

### How to start using it?
Grap the [latest release](https://github.com/exetico/volumio-plugins/releases/latest) - or grap the zip-file (nightly version) in above file-tree if you're into this kind of things.

### Why can't i find it in the main Volumio-plugins tread, or in the market itself?
This plugin isn't ready for the market. But you are welcome to give it a try.


## Features
### Own section in "Browse"
Podstream has it's own tile in the "Browse"-overview, allowing you to easily access all generated playlists.

### Playlists
The plugin generates playlists based on the rss-feeds. The lists will be visible in "Browse" > "Podstream". 

The data is stored in the `/data/podstream/' folder in Volumios preffered format (JSON).

### Thumbnails
Images is provided and listed left to the podcast-episode, if it's provided in the source. Currenlty i'm looking at:
- `itunes:image` in each `item` (Can be unique image)
- `image/url` in `channel` (Global image for whole list)

Thumbsnails is not stored at the device. This means that the images is loaded every time the playlist being opened.

### RSS-list by URL or inline
Podstream allowing you to point to an URL, if you like to add multiple RSS-feeds.

Just put a text-file somewhere, and put in the URL like `https://pastebin.com/raw/hHkqwTSF`. I'm using pastebin.com at the momenet, cause they support raw-output, but a lot of other options is possible too, including Github itself (I actually thinking about including an local-store option too, but i'm not sure? - Create an Issue, if you would like to see it)

Example of the formatting - Basicly is formatted like: `Podcast Title;http://podcasturl.com/rss`
```
StartUp;http://feeds.hearstartup.com/hearstartup?format=xml
Mads og Monopolet;https://www.dr.dk/mu/Feed/mads-monopolet-podcast?format=podcast&limit=10
Morten Resen - Startup;http://mortenresen.libsyn.com/rss
Anders & Anders Podcast;http://www.spreaker.com/show/1929925/episodes/feed
```
Currently it's not planned to combine source-options, cause it's so easy to put up a new file.

Note that the input-field **only support ONE SINGLE RSS-FEED** like `Podcast Title Goes Here;http://podcasthere.com/rss` at the moment.


## To-do/Known issues:
- Allow the user to edit the frequency of the update-interval (on hour-basis) in the Volumio-configs
- Improving the "browsePlaylist" view, and consider if the top-bar should be removed with "image" and huge "Play playlist"-button. 
- Fixing the loading bar somethings ending at 70%, but with the "Plugin Successfully Installed" message is showing up. I'm not sure whether it's a problem in the `install.sh`-file, or the Volumio Plugin-handling. [**07. dec 2017**] Works OK with the Raspberry Pi 2 B (Just tested with clean-install)
- Search is not working... but should it in the future?:-) (the `searchFor` is added)
- Currenlty the playlists isn't removed if you change the source to something else. Clean up dat..... dust.
- Maybe add the option to combine both lit-download from URL and local input, and allowing users to add more than one feed with a seperator like "||" or something else.
- Secure correct `install.sh` and `uninstall.sh` with the `/data/podstream/`-location (Add & Remove folder in the process)
- Create .timer for the .service, so it's triggered every 2. hours fx. OR see [maybe](#maybe)tag where `playlist-parser` is mentioned.

## Maybe:
- Adding force-update to the Option-page.
- Save the global image for each podcast so it can be listed within `listPlaylists` - and consider to allow users to use the "Big tile"-view, if the task is easy to do.
- Looking at https://www.npmjs.com/package/playlist-parser, and consider remake of the playlist generation-solution.

## Latest improvements
- ~~Look into a easy way to handle the rssfeed-stuff. Should i go with an table-kinda thing? (I can't find anything like this, in the Volumio GUI at the moment), or should i go with an simple solution like allowing to referate to an pastebin-file or something like that?~~ 
[**30. nov 2017**] Now supporting download from web-source. I will recommend to use Pastebin.com and choose the "raw"-button. Paste in the URL like `https://pastebin.com/raw/HCVV55US`
- ~~Store playlists in own folder, so it's possibe to remove the playlists when removing the plugin, or do something else? Also think about making a clean-function, if a foldes will be created.~~
[**05. dec 2017**] Moving to /data/podstream - but the code ***isn't yet*** changed!
[**06. dec 2017**] All changes is made. But `install.sh` and `uninstall.sh` needs to be updated. This is added to the to-do.
- ~~^ As part of this, consider to move the things to a "Podstream" section in "Browse" for easy access.~~
[**05. dec 2017**] Ongoing - The basic-feature is now done (Need more changed + fixed SVG-file size!). ++ Styling in top of the uri isn't good when looking into the playlists.
[**06. dec 2017**] The Browse-feature is now workking, but needs more love. A new "To-do" point is added.
- ~~Thumbsnails is only visible, if it's stored in itunes:image-tag.~~
[**06. dec 2017**] Thumbnails is now taken from itunes:image in each item (Can be unique image) OR image/url in channel (Global image for whole list)

## Credits
- Thanks to volspotconnect for the structure of the solution. I couldnt' find out how is was working.
- Thanks to buzink for the original podcast-playlist structure, idea and solution (It's now hardly changed, cleaned up, and multiple options is removed)
- Thanks to the Volumio-tema. Multiple lines is used with just a few changes, cause the `playlistManager` > `listPlaylist` can't handle custom folder locations.