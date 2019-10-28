exports.cleanFrontendObj = function cleanFrontendObj(obj) {
  delete obj.location.href;
  delete obj.location.search;
  delete obj.navigator.connection.downlink;
  delete obj.navigator.connection.rtt;
  delete obj.clientInformation.connection.downlink;
  delete obj.clientInformation.connection.rtt;
  delete obj.performance.memory;
  delete obj.performance.timeOrigin;
  delete obj.performance.timing;
  delete obj.performance.navigation.type;
  delete obj.console.memory;
  delete obj.screen.orientation.type;

  delete obj.devicePixelRatio;
  delete obj.history.length;
  delete obj.innerWidth;
  delete obj.memory;
  delete obj.pageYOffset;
  delete obj.pageXOffset;
  delete obj.screenLeft
  delete obj.screenTop
  delete obj.screenX
  delete obj.scrollY
  delete obj.innerHeight;
  delete obj.pageYOffset;
  delete obj.visualViewport.width;
  delete obj.visualViewport.height
  delete obj.visualViewport.pageTop

  delete obj.PaymentInstruments;
  delete obj.PaymentManager;

  return obj;
}

exports.cleanFrontendJson = function cleanFrontendJson(json) {
  json = json.replace(/"function[^\(]*\(([^\)]*)\) \{[^"]*\}"/gm, '"function($1) { }"');
  json = json.replace('CIRCULAR VALUE TO: window.clientInformation.', 'CIRCULAR VALUE TO: window.navigator.')
  return json;
}
