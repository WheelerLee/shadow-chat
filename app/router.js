'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.post('/upload', controller.home.upload);
  router.get('/.well-known/pki-validation/fileauth.txt', controller.home.check);
  router.get('/load/', controller.home.load2);

  // io.of('/').route('ping', io.controller.default.ping);
  io.of('/').route('exchange', io.controller.nsp.exchange);

};
