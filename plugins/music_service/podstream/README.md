[![GitHub version](https://badge.fury.io/gh/exetico%2Fvolumio-plugins.svg)](https://badge.fury.io/gh/exetico%2Fvolumio-plugins)

**IMPORTANT**
This plugin isn't ready for regular use, **if you expect it to auto-update the playlists**.

But you are welcome to give it a try, if you're willing to trigger the job by you own. It's pretty easy. There is three possible ways:
1. Press the save-button in options
2. Disable and enable the plugin
3. Restart Volumio

**If you have any improvements to the project, please let me know.**


![Podcast icon provided by FontAwesome converted with http://fa2png.io/](https://user-images.githubusercontent.com/3549445/33657348-53f6ba7c-da79-11e7-9997-c4e621461a7a.png)


# Podstream - Stream Podcasts on Volumio
This is still in early state - but you are welcome to give it a try. Please take a look at the [To-do/Known issues](#to-doknown-issues)-section, before issue-submit. Thanks!

### What is this?
It's basicly allows you to stream podcasts and other content stored in rss-format.

### How to start using it?
Grap the [latest release](https://github.com/exetico/volumio-plugins/releases/latest) - or grap the zip-file (nightly version) in above file-tree if you're into this kind of things.

### Why can't i find it in the main Volumio-plugins tread, or in the market itself?
This plugin isn't ready for the market. But you are welcome to give it a try.


# Features
### Own section in "Browse"
Podstream has it's own tile in the "Browse"-overview, allowing you to easily access all generated playlists.

### Playlists
The plugin generates playlists based on the rss-feeds. The lists will be visible in "Browse" > "Podstream". 

The data is stored in the `/data/podstream/' folder in Volumios preffered format (JSON).

### Albumart
Images is provided for each episode, if i can find it in the source. Currenlty i'm looking at:
- `itunes:image` in each `item` (Can be unique image)
- `image/url` in `channel` (Global image for whole list)

Albumart for each episode is not stored at the device. This means that the images is loaded every time the playlist being opened. But albumart for each podcast-playlist is downloaded to the device and stored in $PLUGINDIR > `albumart`. Here i'm looking at:
- First `<url>` in the XML. It's very basic, but works as it should. The full command is: `grep -o '<url>[^<]*' "$filename".rss | grep -o '[^>]*$' | xargs wget -O "$PLUGINDIR/albumart/$albumartname" -c`

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
Note that the input-field **only support ONE SINGLE RSS-FEED** like `Podcast Title Goes Here;http://podcasthere.com/rss` at the moment.

# To-do/Known issues
- [ ] Allow the user to edit the frequency of the update-interval (on hour-basis) in the Volumio-configs
- [ ] Fixing the loading bar somethings ending at 70%, but with the "Plugin Successfully Installed" message is showing up. I'm not sure whether it's a problem in the `install.sh`-file, or the Volumio Plugin-handling. **07. dec 2017** Works OK with the Raspberry Pi 2 B (Just tested with clean-install)
- [ ] Search is not working... but should it in the future?:-) (the `searchFor` is added)
- [ ] Currenlty the playlists isn't removed if you change the source to something else. Clean up dat..... dust.
- [ ] Create .timer for the .service, so it's triggered every 2. hours fx - or see [maybe](#maybe)-tag where `playlist-parser` is mentioned.
- [ ] Add an "FAQ/Quick start guide" to the plugin
- [ ] Publich the plugin and tell the world about the plugin in the [Volumio 2 Plugins Collection](https://volumio.org/forum/volumio-plugins-collection-t6251.html)-thread.

# Maybe
- Add the option to combine both URL-feed and local input - and allow users to add more than one feed with a seperator like "||" or something else.
- Add support for a local-storage file in `/mnt/INTERNAL` (cause that folder is easy to access on the local network)
- Add force-update to the Option-page.
- Look at https://www.npmjs.com/package/playlist-parser, and consider remake of the playlist generation-solution.
- Improve the streame-filename title in "Playing now" if possible?

# Latest improvements
- [x] _Look into a easy way to handle the rssfeed-stuff. Should i go with an table-kinda thing? (I can't find anything like this, in the Volumio GUI at the moment), or should i go with an simple solution like allowing to referate to an pastebin-file or something like that?_<br/>
 **30. nov 2017** Now supporting download from web-source. I will recommend to use Pastebin.com and choose the "raw"-button. Paste in the URL like `https://pastebin.com/raw/HCVV55US`
- [x] _Store playlists in own folder, so it's possibe to remove the playlists when removing the plugin, or do something else? Also think about making a clean-function, if a foldes will be created._<br/>
 **05. dec 2017** Moving to /data/podstream - but the code ***isn't yet*** changed!<br/>
 **06. dec 2017** All changes is made. But `install.sh` and `uninstall.sh` needs to be updated. This is added to the to-do.
- [x] _As part of the move, consider to move the things to a "Podstream" section in "Browse" for easy access._<br/>
 **05. dec 2017** Ongoing - The basic-feature is now done (Need more changed + fixed SVG-file size!). ++ Styling in top of the uri isn't good when looking into the playlists.<br/>
 **06. dec 2017** The Browse-feature is now workking, but needs more love. A new "To-do" point is added.
- [x] _Thumbsnails is only visible, if it's stored in itunes:image-tag._<br/>
 **06. dec 2017** Thumbnails is now taken from itunes:image in each item (Can be unique image) OR image/url in channel (Global image for whole list)
- [x] _Improving the "browsePlaylist" view, and consider if the top-bar should be removed with  "image" and huge "Play playlist"-button._<br/>
 **07. dec 2017** Added grid-option and corrected the UI-things, so it looks more clean.
- [x] _Secure correct `install.sh` and `uninstall.sh` with the `/data/podstream/`-location (Add & Remove folder in the process)_<br/>
 **07. dec 2017** Now added to `install.sh` and `uninstall.sh`
- [x] _Save the global image for each podcast so it can be listed within `listPlaylists` - and consider to allow users to use the "Big tile"-view, if the task is easy to do. If the images will be saved globally, use the cover-art for the podcast to display in `listPlaylists`_ <br/>
 **07. dec 2017** Albumart on playlist-level is now stored in $PLUGINDIR > `albumart`. Albumart on episode-level is still loaded by the URL's found in the XML.


# Screenshots
Latest screenshots is from v. `0.0.3`. Note that changes could have been made.

Option-page

![Option-page](https://user-images.githubusercontent.com/3549445/33711098-0fb525e0-db43-11e7-9c2e-ec33b3777c8a.png)

Icon in Browse

![Icon in Browse](https://user-images.githubusercontent.com/3549445/33711139-3abfbc1e-db43-11e7-9539-1a425259bdaa.png)

Playlist (Podcast) overview

![Playlist (Podcast) overview](https://user-images.githubusercontent.com/3549445/33711171-54f23a1c-db43-11e7-9d93-5917cd15cb43.png)

Browse single playlist (with unique images for each episode)

![Browse single playlist (with unique images for each episode)](https://user-images.githubusercontent.com/3549445/33711230-934c3a74-db43-11e7-96e8-4fa55402357d.png)
_An clean-up is planned for this part of the plugin._

Overview of all podcasts in Grid-mode
![Browse single playlist - Grid view)](https://user-images.githubusercontent.com/3549445/33728578-2736e874-db7b-11e7-985e-3f327da97ee1.png)

Viewing playlist - Grid view
![Browse single playlist - Grid view)](https://user-images.githubusercontent.com/3549445/33715801-1d48a6e4-db54-11e7-9eba-7877f12f1bb3.png)


# Credits
- Thanks to the [Volumio-tema](https://github.com/volumio/Volumio2). Multiple lines is used with just a few changes, cause the `playlistManager` > `listPlaylist` can't handle custom folder locations.
- Thanks to [buzink](https://github.com/buzink/podcast2playlist) for the original podcast-playlist structure, idea and solution (_It's now hardly changed, cleaned up, and multiple options is removed_)
- Thanks to [volspotconnect](https://github.com/balbuze/volumio-plugins/tree/master/plugins/music_service/volspotconnect) for the first code-structure. I couldnt' find out how is was working back then.