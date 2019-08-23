/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1551444612633_9744';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    view: {
      root: [
        path.join(appInfo.baseDir, 'app/view'),
        path.join(appInfo.baseDir, 'path/to/another')
      ].join(','),
      mapping: {
        '.njk': 'nunjucks'
      },
      defaultViewEngine: 'nunjucks',
      defaultExtension: '.njk'
    },
    io: {
      init: {
        wsEngine: 'ws'
      },
      namespace: {
        '/': {
          connectionMiddleware: [ 'auth' ],
          packetMiddleware: []
        }
      }
    },
    logger: {
      level: 'DEBUG'
    },
    multipart: {
      mode: 'file',
      fileSize: '100mb',
      tmpdir: process.cwd() + '/app/public/upload/'
    }
  };

  return {
    ...config,
    ...userConfig
  };
};
