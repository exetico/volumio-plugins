[![GitHub version](https://badge.fury.io/gh/exetico%2Fvolumio-plugins.svg)](https://badge.fury.io/gh/exetico%2Fvolumio-plugins)

!! **Please note that this plugin isn't ready for regular use with auto-updates RSS-feeds. But you can actually us it. To force an update, just restart Volumio, or disable and enable the plugin - if you change the rss-data feed, update is also forced. If you have any improvements to the project, please fell free to suggest changes.** !!

![Podcast icon provided by FontAwesome converted with http://fa2png.io/](https://user-images.githubusercontent.com/3549445/33657348-53f6ba7c-da79-11e7-9997-c4e621461a7a.png)


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