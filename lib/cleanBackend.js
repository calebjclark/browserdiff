exports.cleanBackendObj = function cleanBackendObj(obj) {
  delete obj.socket._handle.bytesRead;
  delete obj.socket._handle.fd;
  delete obj.socket.server._connections;
  delete obj.socket._idleNext;
  delete obj.socket._idleStart;
  delete obj.url;

  return obj;
}

exports.cleanBackendJson = function cleanBackendJson(json) {
  return json;
}
