1）找到/node_modules/sockjs-client/dist/sockjs.js文件
2）在1609行，注释掉self.xhr.send(payload);
3）确认Node 版本问题 -> 14.16.0