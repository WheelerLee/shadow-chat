'use strict';

const Subscription = require('egg').Subscription;
const fs = require('fs');
const path = require('path');

class DeleteFile extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10m', // 30 分钟间隔
      type: 'all' // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // const list = fs.readdirSync(process.cwd() + '/app/public/upload');
    // console.log(list);
    const x = function(p) {
      const list = fs.readdirSync(p);
      if (list.length === 0) { // 文件夹内没有任何文件，删除文件夹
        fs.rmdirSync(p);
        return;
      }
      for (const file of list) {
        const filePath = path.join(p, file);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) {
          x(filePath);
        } else {
          if (new Date(fileStat.mtime).getTime() + 10 * 60 * 1000 < new Date().getTime()) {
            fs.unlinkSync(filePath);
          }
        }
      }
    };
    x(process.cwd() + '/app/public/upload');
  }
}

module.exports = DeleteFile;
