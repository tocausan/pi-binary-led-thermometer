# bme680

Node.js module for controlling [Bosch Sensortec BME680](https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST-BME680-DS001-00.pdf) sensors.

[![pipeline status](https://gitlab.com/ftmazzone/bme680/badges/master/pipeline.svg)](https://gitlab.com/ftmazzone/bme680/commits/master)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=BME680&metric=alert_status&style=flat-square)](https://sonarcloud.io/dashboard?id=BME680)



## Installation

```sh
npm install bme680-sensor
```

### Wiring

| bme680 pin  | Raspberry Pi pin| Raspberry Pi GPIO|
|-------------|:----------------|:-----------------|
| VIN (3,3 V) | 1               |                  |
| GND         | 6               |                  |
| SDI         | 3               | 2                |
| SCK         | 5               | 3                |



## Available Methods

### initialize

Initialize the sensor.

| Setting                | Default value|
|------------------------|:-------------|
| Temperature offset     | 0            |
| Gas heater temperature | 320          |
| Gas heater duration    | 150 ms       |
| Gas heater profile     | 0            |

Usage:
```javascript
'use strict';

const { Bme680 } = require('bme680-sensor');
const bme680 = new Bme680(1, 0x76);

bme680.initialize().then(async () => {
    console.info('Sensor initialized');
    setInterval(async () => {
        console.info(await bme680.getSensorData());
    }, 3000);
});
```

## Credits

* [BoschSensortec/BME680_driver](https://github.com/BoschSensortec/BME680_driver) to understand the i2C communication between the sensor and the controller - [Bosch Sensortec GmbH license](https://github.com/BoschSensortec/BME680_driver/blob/master/LICENSE)
* [pimoroni/bme680](https://github.com/pimoroni/bme680) to understand the i2C communication between the sensor and the controller - [MIT](https://github.com/pimoroni/bme680/blob/master/LICENSE)
* [kelly/node-i2c](https://github.com/kelly/node-i2c#readme) to communicate with i2c devices - [BSD-3-Clause-Attribution](https://github.com/kelly/node-i2c/blob/master/LICENSE)
