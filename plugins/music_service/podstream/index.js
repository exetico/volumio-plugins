'use strict';

var libQ = require('kew');
var libNet = require('net');
var fs = require('fs-extra');
var config = new(require('v-conf'))();
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

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
 self.logger.PodStr = function(data) {
  self.logger.info('[Podstream] ' + data);
 };

 //
 self.unsetVol = function() {
  var self = this;
 };

}

ControllerPodstream.prototype.onPodstreamStart = function() {
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

 return defer.promise;
};

// Podstream stop
ControllerPodstream.prototype.stop = function() {
 var self = this;


 self.logger.info("Killing Podstream daemon");
 exec("/bin/systemctl stop podstream.service", {
  uid: 1000,
  gid: 1000
 }, function(error, stdout, stderr) {
  if (error) {
   self.logger.info('Error in killing Voslpotconnect')
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

 self.commandRouter.i18nJson(__dirname + '/i18n/strings_' + lang_code + '.json',
   __dirname + '/i18n/strings_en.json',
   __dirname + '/UIConfig.json')
  .then(function(uiconf) {

   uiconf.sections[0].content[0].value = self.config.get('rssfeeds');
   uiconf.sections[0].content[1].value = self.config.get('oncalendar');
   defer.resolve(uiconf);
  })
  .fail(function() {
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
   

   fs.writeFile("/data/plugins/music_service/podstream/rssfeeds", feedsString, 'utf8', function(err) {
    if (err)
     defer.reject(new Error(err));
    else defer.resolve();
   });

  //  fs.writeFile("/data/plugins/music_service/podstream/rssfeeds.sh", conf1, 'utf8', function(err) {
  //   if (err)
  //    defer.reject(new Error(err));
  //   else defer.resolve();
  //  });


  });


 } catch (err) {


 }

 return defer.promise;

};

ControllerPodstream.prototype.savePodstreamAccount = function(data) {
 var self = this;

 var defer = libQ.defer();

 self.config.set('rssfeeds', data['rssfeeds']);
 self.config.set('oncalendar', data['oncalendar']);
 //self.config.set('bitrate', data['bitrate']);
 //self.config.set('familyshare', data['familyshare']);
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