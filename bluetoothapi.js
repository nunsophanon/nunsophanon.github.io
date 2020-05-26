/ １．BLEデバイスをスキャンする
navigator.bluetooth.requestDevice({
  acceptAllDevices:true, // 全てのデバイスを対象にスキャンを実施する
  optionalServices:['利用するServiceのUniform Type Identifierを予め指定する']
}).then(device => {

  // ２．デバイスに接続
  return device.gatt.connect();

}).then(server =>{

  // ３-1．「Service」を指定
  return server.getPrimaryService("ServiceのUniform Type Identifierを指定");

}).then(service =>{

  // ３-2．「Characteristc」を指定
  return service.getCharacteristic("CharacteristcのUniform Type Identifierを指定");

}).then((characteristic)  => {

  //４．受信準備を行う
  return characteristic.startNotifications().then(char => {

    //５．受信したバイナリを解析、処理の実施
    characteristic.addEventListener('characteristicvaluechanged', (event) => {

      // 「event.target.value」がDataView型で渡ってくるのでこれを解析

    });
  });
});
