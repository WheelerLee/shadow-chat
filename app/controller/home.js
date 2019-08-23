'use strict';

const Controller = require('egg').Controller;
// const parse = require('url-parse');
// const path = require('path');
const fs = require('fs');
const contentDisposition = require('content-disposition');
const mimeTypes = require('mime-types');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const url = ctx.request.url;
    const array = url.split('/');
    // const parsedUrl = parse(url);
    // const pathname = parsedUrl.pathname;
    ctx.body = await ctx.renderView('home/index', {
      room: array[1]
    });
  }

  async check() {
    const { ctx } = this;
    ctx.body = await ctx.renderView('home/check');
  }

  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const str = file.filepath;
    const mime = file.mime;
    ctx.body = {
      url: '/load?id=' + str.replace(process.cwd() + '/app/public/upload', ''),
      mime
    };

  }

  async load2() {
    const { ctx } = this;
    // console.log(process.cwd() + '/app/public/js/socket.io.js');
    // ctx.attachment('a.ico');
    const id = ctx.query.id;
    const index = id.lastIndexOf('.');
    let pex = '';
    if (index >= 0) {
      pex = id.substr(index);
    }
    const ct = mimeTypes.lookup(pex);
    const p = process.cwd() + '/app/public/upload' + id;
    ctx.set('Content-Disposition', contentDisposition(p, { type: 'inline' }));
    ctx.set('Content-Type', ct);
    ctx.body = fs.createReadStream(p);
  }

}

module.exports = HomeController;
