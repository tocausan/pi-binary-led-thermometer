'use strict';

const rpio = require('rpio'),
    {Bme680} = require('bme680-sensor');

const bme680 = new Bme680(1, 0x76);
bme680.initialize()
    .then(async () => {
        console.log('Sensor initialized');
        const pins = [[11, 13, 15, 19], [12, 16, 18, 32], [36, 38, 40, 35]],
            negativePin = 37;

        pins.forEach(pinGroup => {
            pinGroup.forEach(pin => rpio.open(pin, rpio.OUTPUT, rpio.LOW))
        });
        rpio.open(negativePin, rpio.OUTPUT, rpio.LOW);

        pins.forEach(pinGroup => {
            pinGroup.forEach(pin => {
                rpio.write(pin, rpio.HIGH);
                rpio.msleep(50);
                rpio.write(pin, rpio.LOW);
            });
        });

        setInterval(async () => {
            bme680.getSensorData()
                .then(sensorData => {

                    if(sensorData !== null && sensorData.data !== undefined && sensorData.data !== null) {

                        console.log(sensorData.data.temperature.toFixed(1));

                        pins.map((pinGroup, i) => {

                            pinGroup.forEach(pin => rpio.write(pin, rpio.LOW));
                            rpio.write(negativePin, rpio.LOW);

                            if(sensorData.data.temperature > 0) rpio.write(negativePin, rpio.HIGH);

                            const u = Math.abs(sensorData.data.temperature).toFixed(1).toString().replace('.', '')[i];

                            switch (parseInt(u)) {
                                case 1:
                                    rpio.write(pins[i][0], rpio.HIGH);
                                    break;
                                case 2:
                                    rpio.write(pins[i][1], rpio.HIGH);
                                    break;
                                case 3:
                                    rpio.write(pins[i][0], rpio.HIGH);
                                    rpio.write(pins[i][1], rpio.HIGH);
                                    break;
                                case 4:
                                    rpio.write(pins[i][2], rpio.HIGH);
                                    break;
                                case 5:
                                    rpio.write(pins[i][0], rpio.HIGH);
                                    rpio.write(pins[i][2], rpio.HIGH);
                                    break;
                                case 6:
                                    rpio.write(pins[i][1], rpio.HIGH);
                                    rpio.write(pins[i][2], rpio.HIGH);
                                    break;
                                case 7:
                                    rpio.write(pins[i][0], rpio.HIGH);
                                    rpio.write(pins[i][1], rpio.HIGH);
                                    rpio.write(pins[i][2], rpio.HIGH);
                                    break;
                                case 8:
                                    rpio.write(pins[i][3], rpio.HIGH);
                                    break;
                                case 9:
                                    rpio.write(pins[i][0], rpio.HIGH);
                                    rpio.write(pins[i][3], rpio.HIGH);
                                    break;
                            }
                        });
                    }
                })
                .catch(err => {
                    console.log(err);

                    pins.forEach(pinGroup => {
                        pinGroup.forEach(pin => {
                            rpio.write(pin, rpio.HIGH);
                            rpio.msleep(50);
                            rpio.write(pin, rpio.LOW);
                        });
                    });

                })
        })
    });