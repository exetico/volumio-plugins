'use strict';

var libQ = require('kew');
var libNet = require('net');
var fs = require('fs-extra');
var config = new(require('v-conf'))();
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var endOfLine = require('os').EOL;
const download = require('download');

var routn = {};
// Define the ControllerPodstream class
module.exports = ControllerPodstream;

function ControllerPodstream(context) {

    var self = this;
    this.context = context;
    this.commandRouter = this.context.coreCommand;
    this.logger = this.context.logger;
    this.configManager = this.context.configManager;

    // Setup Debugger
    self.logger.PodLog = function(data) {
        self.logger.info('[Podstream] ' + data);
    };

    //
    self.unsetVol = function() {
        var self = this;
    };

}

ControllerPodstream.prototype.onVolumioStart = function() {
    var self = this;
    var configFile = this.commandRouter.pluginManager.getConfigurationFile(this.context, 'config.json');
    this.config = new(require('v-conf'))();
    this.config.loadFile(configFile)
    self.createRSSFEEDS();
    return libQ.resolve();
}

ControllerPodstream.prototype.getConfigurationFiles = function() {
    return ['config.json'];
};


// Plugin methods -----------------------------------------------------------------------------

ControllerPodstream.prototype.startPodstreamDaemon = function() {
    var self = this;
    var defer = libQ.defer();

    exec("/usr/bin/sudo /bin/systemctl start podstream.service", {
        uid: 1000,
        gid: 1000
    }, function(error, stdout, stderr) {
        if (error !== null) {
            self.commandRouter.pushConsoleMessage('The following error occurred while starting Podstream: ' + error);
            defer.reject();
        } else {
            self.commandRouter.pushConsoleMessage('Podstream Daemon Started');
            defer.resolve();
        }
    });

    return defer.promise;
};


ControllerPodstream.prototype.onStop = function() {
    var self = this;

    self.logger.info("Killing Podstream daemon");
    exec("/usr/bin/sudo /bin/systemctl stop podstream.service", {
        uid: 1000,
        gid: 1000
    }, function(error, stdout, stderr) {
        if (error) {
            self.logger.info('Error in killing Podstream')
        }
    });

    return libQ.resolve();
};

ControllerPodstream.prototype.onStart = function() {
    var self = this;

    var defer = libQ.defer();

    self.startPodstreamDaemon()
    .then(function(e) {
        //self.PodstreamDaemonConnect(defer)
        // Run stuff when Daemon is connected
    })
    .fail(function(e) {
        defer.reject(new Error());
    });

    // ### Browse START
        self.addToBrowseSources();
    // ### Browse END

    return defer.promise;
};


////////////////////// ### BROWSE THINGS START ### ///////////////////////////////////
// https://github.com/volumio/Volumio2/blob/master/app/plugins/music_service/mpd/index.js
ControllerPodstream.prototype.addToBrowseSources = function () {
    var data = {albumart: '/albumart?sourceicon=music_service/last_100/icon.svg', name: 'Podstream', uri: 'podstreams', plugin_type:'music_service',
        plugin_name:'podstream'};
    this.commandRouter.volumioAddToBrowseSources(data);
};


ControllerPodstream.prototype.handleBrowseUri = function (curUri) {
    var self = this;
    var response;

    self.logger.info("CURURI podstreams: "+curUri);
	var splitted=curUri.split('/');

//playlist
	if (curUri.startsWith('podstreams')) {
        if (curUri == 'podstreams'){
            response = self.listPlaylists(curUri);
		}
        else {
			response = self.browsePlaylist(curUri);
		}
	}

    return response;
}


ControllerPodstream.prototype.listPlaylists = function (uri) {
	var self = this;

    self.logger.info("PODSTREAMlistPlaylists: "+uri);
	var defer = libQ.defer();

	var response={
        "navigation": {
            "lists": [
                {
                    "availableListViews": [
                        "list"
                    ],
                    "items": [

                    ]
                }
            ]
        }
    };

	var promise = self.listPlaylist();
	promise.then(function (data) {
		for (var i in data) {
			var ithdata = data[i];
			var playlist = {
                "service": "mpd",
                "type": 'podstream',
                "title": ithdata,
                "icon": 'fa fa-list-ol',
                "uri": 'podstreams/' + ithdata
            };
            response.navigation.lists[0].items.push(playlist);


            }


		defer.resolve(response);
	});


	return defer.promise;
};

ControllerPodstream.prototype.listPlaylist = function () {
    var defer = libQ.defer();
    var self = this;

    self.logger.info('[' + Date.now() + '] ' + 'Listing podstreams');

    fs.readdir("/data/podstream", function(err,folderContents) {
        defer.resolve(folderContents);
    });

    return defer.promise;
};

ControllerPodstream.prototype.browsePlaylist = function (uri) {
	var self = this;
    
    self.logger.info("podstreams browsePlaylist: "+curUri);

    var defer = libQ.defer();
    var name = uri.split('/')[1];
    console.log(uri)

    var response={
        "navigation": {
            "lists": [
                {
                    "availableListViews": [
                        "list"
                    ],
                    "items": [

                    ]
                }
            ],
            "info": {
                "uri": 'podstreams/favourites',
                "title":  name,
                "name": name,
                "service": 'mpd',
                "type":  'play-playlist',
                "albumart": '/albumart?sourceicon=music_service/mpd/playlisticon.svg'
            },
            "prev": {
                "uri": "podstreams"
            }
        }
    };

    var name = uri.split('/')[1];

    var promise = self.commandRouter.playListManager.getPlaylistContent(name);
    promise.then(function (data) {

        var n = data.length;
        for (var i = 0; i < n; i++) {
            var ithdata = data[i];
            var song = {
                service: ithdata.service,
                type: 'song',
                title: ithdata.title,
                artist: ithdata.artist,
                album: ithdata.album,
                albumart: ithdata.albumart,
                uri: ithdata.uri
            };
            response.navigation.lists[0].items.push(song);
        }

        defer.resolve(response);
    });

    return defer.promise;
};

ControllerPodstream.prototype.lsInfo = function (uri) {
	var self = this;

	var defer = libQ.defer();

	var sections = uri.split('/');
	var prev = '';
	var folderToList = '';
	var command = 'lsinfo';

	if (sections.length > 1) {

		prev = sections.slice(0, sections.length - 1).join('/');

		folderToList = sections.slice(1).join('/');

		command += ' "' + folderToList + '"';

	}

	var cmd = libMpd.cmd;

	self.mpdReady.then(function () {
		self.clientMpd.sendCommand(cmd(command, []), function (err, msg) {
			var list = [];
			if (msg) {
                var s0 = sections[0] + '/';
				var path;
				var name;
				var dirtype;
				var lines = msg.split('\n');
				for (var i = 0; i < lines.length; i++) {
					var line = lines[i];

					if (line.indexOf('directory:') === 0) {
                        var diricon = 'fa fa-folder-open-o';
						path = line.slice(11);
						var namearr = path.split('/');

                        var albumart = self.getAlbumArt('', '/mnt/' + path,'folder-o');

						dirtype = 'folder';

						name = namearr.pop();
						list.push({
							type: dirtype,
							title: name,
							service:'mpd',
							albumart: albumart,
							uri: s0 + path
						});
					}
					else if (line.indexOf('playlist:') === 0) {
						path = line.slice(10);
						name = path.split('/').pop();
						if (path.endsWith('.cue')) {
							try {
								var cuesheet = parser.parse('/mnt/' + path);

								list.push({
									service: 'mpd',
									type: 'cuefile',
									title: name,
									icon: 'fa fa-list-ol',
									uri: s0 + path
								});
								var tracks = cuesheet.files[0].tracks;
								for (var j in tracks) {

									list.push({
										service: 'mpd',
										type: 'cuesong',
										title: tracks[j].title,
										artist: tracks[j].performer,
										album: path.substring(path.lastIndexOf("/") + 1),
										number: tracks[j].number - 1,
										icon: 'fa fa-music',
										uri: s0 + path
									});
								}
							} catch (err) {
								self.logger.info('Cue Parser - Cannot parse ' + path);
							}
						} else {
							list.push({
								service: 'mpd',
								type: 'song',
								title: name,
								icon: 'fa fa-list-ol',
								uri: s0 + path
							});
						}
					}
					else if (line.indexOf('file:') === 0) {
						var path = line.slice(6);
						var name = path.split('/').pop();

						var artist = self.searchFor(lines, i + 1, 'Artist:');
						var album = self.searchFor(lines, i + 1, 'Album:');
						if (!tracknumbers) {
							var title = self.searchFor(lines, i + 1, 'Title:');
						}
						else {
							var title1 = self.searchFor(lines, i + 1, 'Title:');
							var track = self.searchFor(lines, i + 1, 'Track:');
							var title = track + " - " + title1;
						}
						var year,albumart,tracknumber,duration,composer,genre;
						if(self.commandRouter.sharedVars.get('extendedMetas'))
                        {
                            year = self.searchFor(lines, i + 1, 'Date:');
                            if(year)
                            {
                                year=parseInt(year);
                            }

                            albumart = self.getAlbumArt({artist: artist, album: album},
                                self.getParentFolder('/mnt/' + path),'fa-tags');
                            tracknumber = self.searchFor(lines, i + 1, 'Track:');

                            if(tracknumber)
                            {
                                var split=tracknumber.split('/');
                                tracknumber=parseInt(split[0]);
                            }

                            duration = self.searchFor(lines, i + 1, 'Time:');
                            composer=artist;
                            genre = self.searchFor(lines, i + 1, 'Genre:');
                        }


						if (title) {
							title = title;
						} else {
							title = name;
						}
                        var albumart = self.getAlbumArt('', self.getParentFolder('/mnt/' + path), 'music');
						list.push({
							service: 'mpd',
							type: 'song',
							title: title,
							artist: artist,
							album: album,
							uri: s0 + path,
                            year:year,
                            albumart:albumart,
                            genre:genre,
                            tracknumber:tracknumber,
                            duration:duration,
                            composer:composer
						});
					}

				}
			}
			else self.logger.info(err);

			defer.resolve({
				navigation: {
					prev: {
						uri: prev
					},
					lists: [{availableListViews:['grid', 'list'],items:list}]
				}
			});
		});
	});
	return defer.promise;
};


ControllerPodstream.prototype.searchFor = function (lines, startFrom, beginning) {
    
        var count = lines.length;
        var i = startFrom;
    
        while (i < count) {
            var line = lines[i];
    
            if(line!==undefined) {
                if (line.indexOf(beginning) === 0)
                    return line.slice(beginning.length).trimLeft();
                else if (line.indexOf('file:') === 0)
                    return '';
                else if (line.indexOf('directory:') === 0)
                    return '';
            }
    
            i++;
        }
    };

////////////////////// ### BROWSE THINGS END ### ///////////////////////////////////



// Podstream stop
ControllerPodstream.prototype.stop = function() {
    var self = this;


    self.logger.info("Killing Podstream daemon");
    exec("/bin/systemctl stop podstream.service", {
        uid: 1000,
        gid: 1000
    }, function(error, stdout, stderr) {
        if (error) {
            self.logger.info('Error in killing Podstream')
        }
    });

    return libQ.resolve();
};


ControllerPodstream.prototype.onRestart = function() {
    var self = this;
    //
};

ControllerPodstream.prototype.onInstall = function() {
    var self = this;
    //Perform your installation tasks here
};

ControllerPodstream.prototype.onUninstall = function() {
    var self = this;
    self.logger.info("Killing Podstream daemon");
    exec("/bin/systemctl stop podstream.service", {
        uid: 1000,
        gid: 1000
    }, function(error, stdout, stderr) {
        if (error) {
            self.logger.info('Error in killing Podstream')
        }
    });

    return libQ.resolve();
};

ControllerPodstream.prototype.getUIConfig = function() {
    var defer = libQ.defer();
    var self = this;

    var lang_code = this.commandRouter.sharedVars.get('language_code');
    self.logger.PodLog('Loading up Configs')

    self.commandRouter.i18nJson(__dirname + '/i18n/strings_' + lang_code + '.json',
            __dirname + '/i18n/strings_en.json',
            __dirname + '/UIConfig.json')
        .then(function(uiconf) {
            self.logger.PodLog('File found..')

            var findOption = function(optionVal, options) {
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value === optionVal)
                        return options[i];
                }
            };

            uiconf.sections[0].content[0].value =
                findOption(self.config.get('rssdatatypeselect'), uiconf.sections[0].content[0].options);
            uiconf.sections[0].content[1].value = self.config.get('rssurlinput');
            uiconf.sections[0].content[2].value = self.config.get('rssfeeds');
            uiconf.sections[1].content[0].value = self.config.get('oncalendar');
            defer.resolve(uiconf);
        })
        .fail(function() {
            self.logger.PodLog('Error with loading configs..')
            defer.reject(new Error());
        });

    return defer.promise;
};

ControllerPodstream.prototype.setUIConfig = function(data) {
    var self = this;
    //Perform your installation tasks here
};

ControllerPodstream.prototype.getConf = function(varName) {
    var self = this;
    //Perform your installation tasks here
};

ControllerPodstream.prototype.setConf = function(varName, varValue) {
    var self = this;
    //Perform your installation tasks here
};

ControllerPodstream.prototype.getAdditionalConf = function(type, controller, data) {
    var self = this;
    return self.commandRouter.executeOnPlugin(type, controller, 'getConfigParam', data);
};

// Public Methods ---------------------------------------------------------------------------------------

ControllerPodstream.prototype.createRSSFEEDS = function() {
    var self = this;
    var defer = libQ.defer();

    var selectedMeth = self.config.get('rssdatatypeselect');

    if (selectedMeth === 1) { // Download from URL
        self.commandRouter.pushConsoleMessage('Selected Download');
        var url = self.config.get('rssurlinput');

        download(url).then(data => {
            fs.writeFile(__dirname + "/rssfeeds", data + endOfLine, 'utf8', function(err) {
              if (err)
                  defer.reject(new Error(err));
              else defer.resolve();
            });
        });
        
    } 
    else if (selectedMeth === 2) { // Local input
        self.commandRouter.pushConsoleMessage('Selected Local Input');
        try {

            fs.readFile(__dirname + "/rssfeeds.tmpl", 'utf8', function(err, templateData) {
                if (err) {
                    defer.reject(new Error(err));
                    return console.log(err);
                }
                var devicename = self.commandRouter.sharedVars.get('system.name');

                var feedsString = templateData.replace("${rssfeeds}", self.config.get('rssfeeds'));
                //var conf1 = data.replace("${rssfeeds}", self.config.get('rssfeeds'));
                //var conf2 = conf1.replace("${password}", self.config.get('password'));
                //var conf3 = conf2.replace("${rate}", rate);

                fs.writeFile(__dirname + "/rssfeeds", feedsString + endOfLine, 'utf8', function(err) {
                    if (err)
                        defer.reject(new Error(err));
                    else defer.resolve();
                });

            });

        } catch (err) {}
    }

    return defer.promise;

};

ControllerPodstream.prototype.savePodstreamOptions = function(data) {
    var self = this;

    var defer = libQ.defer();

    // Selectors - See: https://github.com/volumio/volumio-plugins/blob/master/plugins/music_service/qobuz/index.js
    var rssTypeSelected =
        data['rssdatatypeselect'] && data['rssdatatypeselect'].value ?
        data['rssdatatypeselect'].value :
        1;
    self.config.set('rssdatatypeselect', rssTypeSelected);

    // Input
    self.config.set('rssurlinput', data['rssurlinput']);
    self.config.set('rssfeeds', data['rssfeeds']);
    self.config.set('oncalendar', data['oncalendar']);
    self.rebuildPodstreamAndRestartDaemon()
        .then(function(e) {
            //    self.commandRouter.pushToastMessage('success', "Configuration update", 'The configuration of Podstream has been successfully updated');
            defer.resolve({});
        })
        .fail(function(e) {
            defer.reject(new Error());
        })


    return defer.promise;

};

ControllerPodstream.prototype.rebuildPodstreamAndRestartDaemon = function() {
    var self = this;
    var defer = libQ.defer();
    //console.log('toto')
    self.createRSSFEEDS()
        .then(function(e) {
            var edefer = libQ.defer();
            exec("/usr/bin/sudo /bin/systemctl restart podstream.service", {
                uid: 1000,
                gid: 1000
            }, function(error, stdout, stderr) {
                edefer.resolve();
            });
            return edefer.promise;
        })
        .then(self.startPodstreamDaemon.bind(self))
        .then(function(e) {
            self.commandRouter.pushToastMessage('success', 'config Ok');

            defer.resolve({});
        });

    return defer.promise;
}