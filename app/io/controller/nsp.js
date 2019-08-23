'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async exchange() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { payload } = message;

      const query = socket.handshake.query;
      const room = query.room;
      const user = query.userId;
      const index = query.index;
      const msg = ctx.helper.parseMsg('exchange', payload, { user, index });
      nsp.adapter.clients([ room ], (err, clients) => {
        for (const c of clients) {
          if (c !== client) {
            nsp.emit(c, msg);
          }
        }
      });

    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = NspController;
