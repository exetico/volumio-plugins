[![GitHub version](https://badge.fury.io/gh/exetico%2Fvolumio-plugins.svg)](https://badge.fury.io/gh/exetico%2Fvolumio-plugins)

!! **Please note that this plugin isn't ready for regular use with auto-updates RSS-feeds. But you can actually us it. To force an update, just restart Volumio, or disable and enable the plugin - if you change the rss-data feed, update is also forced. If you have any improvements to the project, please fell free to suggest changes.** !!

![Podcast icon provided by FontAwesome](data:image/png;base64,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)

# Stream Podcasts on Volumio (Create playlist with rss-feeds)
This is still in early state - but you are welcome to look into how it looks. Please take a look at the "To-do/Known issues"-section, before submitting any issues. Thanks!

## Just a quick overview of the main features
### What is this?
It allows you to stream podcasts and other content stored in rss format.

### Thumbnails
Images is provided and listed left to the podcast-episode, if it's provided in the source. Currenlty i'm looking at:
- `itunes:image` in each `item` (Can be unique image)
- `image/url` in `channel` (Global image for whole list)

Let me know if you have any other suggestions. Thumbsnails is not stored at the device. This means that the images is loaded each time the playlist being opened.

### Playlists
The plugin generates playlists based on the rss-feeds. The lists will be visible in "Browse" > "Podstream". Currenlty the playlists isn't removed if you change the source to something else (See to-do)

The data is stored in the `/data/podstream/' folder in Volumios preffered format (JSON).

### Download RSS-list from URL
Podstream allowing you to point to an URL, if you like to add multiple things.

Just put a text-file somewhere, and put in the URL like `https://pastebin.com/raw/HCVV55US`. I recommend pastebin.com cause whey support raw-output, but a lot of other options is possible too, including Github itself.

I don't have any plans to extend this feature, cause it's so easy to put up a new file on a filehost somewhere.


## To-do/Known issues:
- Create .timer for the .service, so it's triggered every 2. hours fx. OR see [...maybe]-tag where `playlist-parser` is mentioned.
- Allow the user to edit the frequency of the update-interval (on hour-basis) in the Volumio-configs
- Improving the "browsePlaylist" view, and consider if the top-bar should be removed with "image" and huge "Play playlist"-button. 
- Fixing the loading bar somethings ending at 70%, but with the "Plugin Successfully Installed" message is showing up. I'm not sure whether it's a problem in the `install.sh`-file, or the Volumio Plugin-handling.
- Search is not working... but should it in the future?:-) (the `searchFor` is added)
- Thumbsnails is only visible, if it's stored in itunes:image-tag.
- Maybe add the option to combine both lit-download from URL and local input, and allowing users to add more than one feed with a seperator like "||" or something else.
- Secure correct `install.sh` and `uninstall.sh` with the `/data/podstream/`-location (Add & Remove folder in the process)

## Maybee:
- [... maybe] Adding force-update to the Option-page.
- [... maybe] Save the global image for each podcast so it can be listed within `listPlaylists` - and consider to allow users to use the "Big tile"-view, if the task is easy to do.
- [... maybe] Looking at https://www.npmjs.com/package/playlist-parser, and consider remake of the playlist generation-solution.

## Latest improvements
- ~~Look into a easy way to handle the rssfeed-stuff. Should i go with an table-kinda thing? (I can't find anything like this, in the Volumio GUI at the moment), or should i go with an simple solution like allowing to referate to an pastebin-file or something like that?~~ 
[**30. nov 2017**] Now supporting download from web-source. I will recommend to use Pastebin.com and choose the "raw"-button. Paste in the URL like `https://pastebin.com/raw/HCVV55US`
- ~~Store playlists in own folder, so it's possibe to remove the playlists when removing the plugin, or do something else? Also think about making a clean-function, if a foldes will be created.~~
[**05. dec 2017**] Moving to /data/podstream - but the code ***isn't yet*** changed!
[**06. dec 2017**] All changes is made. But `install.sh` and `uninstall.sh` needs to be updated. This is added to the to-do.
- ~~^ As part of this, consider to move the things to a "Podstream" section in "Browse" for easy access.~~
[**05. dec 2017**] Ongoing - The basic-feature is now done (Need more changed + fixed SVG-file size!). ++ Styling in top of the uri isn't good when looking into the playlists.
[**06. dec 2017**] The Browse-feature is now workking, but needs more love. A new "To-do" point is added.

## Credits
- Thanks to volspotconnect for the structure of the solution. I couldnt' find out how is was working.
- Thanks to buzink for the original podcast-playlist structure, idea and solution (It's now hardly changed, cleaned up, and multiple options is removed)
- Thanks to the Volumio-tema. Multiple lines is used with just a few changes, cause the `playlistManager` > `listPlaylist` can't handle custom folder locations.