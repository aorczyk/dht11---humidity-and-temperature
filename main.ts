let latestCommands: { [key: string]: number } = {}
let led1 = false;
let led2 = false;
let temperature = 0;
let humidity = 0;

basic.clearScreen()

bluetooth.startUartService()

// bluetooth.onBluetoothConnected(function () {
// })

// bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
//     let command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
//     let commadParts = command.split("=")

//     latestCommands[commadParts[0]] = parseFloat(commadParts[1])
// })

// basic.forever(function () {
//     while (Object.keys(latestCommands).length) {
//         let commandName = Object.keys(latestCommands)[0]
//         let commandValue = latestCommands[commandName]
//         delete latestCommands[commandName];

//         if (commandName == "-v") {

//         } else if (commandName == "1") {
//             getData()
//         }
//     }
// })

function getData() {
    try {
        dht11_dht22.queryData(DHTtype.DHT11, DigitalPin.P1, true, false, true)

        let temp = dht11_dht22.readData(dataType.temperature)
        if (temp != -999) {
            temperature = temp
        }

        let humi = dht11_dht22.readData(dataType.humidity)
        if (humi != -999) {
            humidity = humi
        }
    } catch(err) {}
    
    let out = [input.runningTime(), input.temperature(), temperature, humidity]
    bluetooth.uartWriteString("" + out.join(',') + '\n')
    // basic.showNumber(humidity)
}

basic.forever(function () {
    getData()
    basic.pause(1000)
})