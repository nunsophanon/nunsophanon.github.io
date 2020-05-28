function connectAPI(){
// １．BLEデバイスをスキャンする
navigator.bluetooth.requestDevice({
  acceptAllDevices:true, // 全てのデバイスを対象にスキャンを実施する
  optionalServices:['health_thermometer'] //Health Thermometer
}).then(device => {

  // ２．デバイスに接続
  // return device.gatt.connect();
  const server = await device.gatt.connect();
  const service = await server.getPrimaryService("battery_service");
  console.log("--------------battery",service);
}).then(server =>{

  // ３-1．「Service」を指定
  return server.getPrimaryService("battery_service");

}).then(service =>{

  // ３-2．「Characteristc」を指定
  return service.getCharacteristic("temperature_celsius");

}).then((characteristic)  => {

  //４．受信準備を行う
  return characteristic.startNotifications().then(char => {

    //５．受信したバイナリを解析、処理の実施
    characteristic.addEventListener('characteristicvaluechanged', (event) => {

      // 「event.target.value」がDataView型で渡ってくるのでこれを解析

    });
  });
});
};
