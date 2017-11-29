'use strict';

var libQ = require('kew');
var fs=require('fs-extra');
var config = new (require('v-conf'))();
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;


module.exports = podfeeder;
function podfeeder(context) {
	var self = this;

	this.context = context;
	this.commandRouter = this.context.coreCommand;
	this.logger = this.context.logger;
	this.configManager = this.context.configManager;

}


podfeeder.prototype.onVolumioStart = function()
{
	var self = this;
	var configFile=this.commandRouter.pluginManager.getConfigurationFile(this.context,'config.json');
	this.config = new (require('v-conf'))();
	this.config.loadFile(configFile);

    return libQ.resolve();
}

podfeeder.prototype.onStart = function() {
    var self = this;
	var defer=libQ.defer();

	var scriptname = "cron_add"
	var command = "/usr/bin/sudo /data/plugins/music_service/podfeeder/" + scriptname + ".sh";
	exec(command, {uid:1000,gid:1000}, function (error, stdout, stderr) {
		if (error !== null) {
			self.commandRouter.pushConsoleMessage('The following error occurred while starting ' + scriptname + ': ' + error);
			self.commandRouter.pushToastMessage('error', "Restart failed", "Restarting " + scriptname + " failed with error: " + error);
			defer.reject();
		}
		else {
			self.commandRouter.pushConsoleMessage(scriptname + ' started');
			if(boot == false)
				self.commandRouter.pushToastMessage('success', "Restarted " + scriptname, "Restarted " + scriptname + " for the changes to take effect.");
			
			defer.resolve();
		}
	});
  
	// SOURCE: https://github.com/balbuze/volumio-plugins/blob/master/plugins/music_service/volspotconnect/index.js
	//    this.commandRouter.sharedVars.registerCallback('alsa.outputdevice', this.rebuildVOLSPOTCONNECTAndRestartDaemon.bind(this));
	//    this.commandRouter.sharedVars.registerCallback('alsa.outputdevicemixer', this.rebuildVOLSPOTCONNECTAndRestartDaemon.bind(this));
	//    this.commandRouter.sharedVars.registerCallback('system.name', this.rebuildVOLSPOTCONNECTAndRestartDaemon.bind(this));
	//    this.commandRouter.sharedVars.registerCallback('alsa.device', this.rebuildVOLSPOTCONNECTAndRestartDaemon.bind(this)); 

    return defer.promise;
};

podfeeder.prototype.onStop = function() {
    var self = this;
    var defer=libQ.defer();



	// exec("/usr/bin/sudo /data/plugins/music_service/podfeeder/cron_remove.sh", {
	//  uid: 1000,
	//  gid: 1000
	// }, function(error, stdout, stderr) {
	// 	console.log('stdout: ' + stdout);
	// 	console.log('stderr: ' + stderr);
	// 	if (error !== null) {
	// 	  console.log('exec error: ' + error);
	// 	}
	// });

	// self.logger.info("Removing hourly cron-job");
	// exec("./data/plugins/music_service/podfeeder/cron_remove.sh", {
	//  uid: 1000,
	//  gid: 1000
	// }, function(error, stdout, stderr) {
	//  if (error) {
	//   self.logger.info('Error in removing cron aka. stopping the service... Did you remove it manually from /etc/cron.hourly/podfeeder-update?')
	//  }
	// });


    // Once the Plugin has successfull stopped resolve the promise
    defer.resolve();

    return libQ.resolve();
};

podfeeder.prototype.onRestart = function() {
    var self = this;
    // Optional, use if you need it
};

// Plugin stuff --------------------------------------------------------------------------------------------




// Configuration Methods -----------------------------------------------------------------------------

podfeeder.prototype.getUIConfig = function() {
    var defer = libQ.defer();
    var self = this;

    var lang_code = this.commandRouter.sharedVars.get('language_code');

    self.commandRouter.i18nJson(__dirname+'/i18n/strings_'+lang_code+'.json',
        __dirname+'/i18n/strings_en.json',
        __dirname + '/UIConfig.json')
        .then(function(uiconf)
        {


            defer.resolve(uiconf);
        })
        .fail(function()
        {
            defer.reject(new Error());
        });

    return defer.promise;
};


podfeeder.prototype.setUIConfig = function(data) {
	var self = this;
	//Perform your installation tasks here
};

podfeeder.prototype.getConf = function(varName) {
	var self = this;
	//Perform your installation tasks here
};

podfeeder.prototype.setConf = function(varName, varValue) {
	var self = this;
	//Perform your installation tasks here
};



// Announce updated State
podfeeder.prototype.pushState = function(state) {
	var self = this;
	self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'podfeeder::pushState');

	return self.commandRouter.servicePushState(state, self.servicename);
};


podfeeder.prototype.explodeUri = function(uri) {
	var self = this;
	var defer=libQ.defer();

	// Mandatory: retrieve all info for a given URI

	return defer.promise;
};½
