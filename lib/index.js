const net = require('net');

/**
 * @method get
 * @description Responsible for getting a available Port
 * 
 * @param {Number} max Maximum port value
 * @param {Number} min Minimum port value
 */
function get(max, min) {
    return new Promise((resolve, reject) => {
        findAvailablePort(max, min, (err, port) => {
            if (err) {
                return reject(err);
            }

            return resolve(port);
        })
    })
}

/**
 * @method findAvailablePort
 * 
 * @param {Number} max 
 * @param {Number} min 
 * @param {Function} callback 
 */
function findAvailablePort(max, min, callback) {
    var port = generateRandomPort(max, min);

    testConnection(port).then((connected) => {
        if (connected) {
            findAvailablePort(max, min, callback);
        } else {
            return callback(null, port);
        }
    }).catch((err) => {
        return callback(err);
    })
}

/**
 * @method generateRandomPort
 * 
 * @param {Number} max 
 * @param {Number} min 
 */
function generateRandomPort(max = 10000, min = 1024) {
    return Math.floor((Math.random() * (max - min)) + min);
}

/**
 * @method test
 * @description Test if port is in use
 * 
 * @param {Number} port 
 */
function testConnection(port) {
    return new Promise((resolve) => {
        var socket = net.createConnection({ port: port }, () => {
            resolve(true);
        });

        socket.on('error', () => {
            resolve(false);
        });
    })
}

get()
    .then((port) => {
        console.log(port);
    }).catch(err => {
        console.log(err);
    })

module.exports.get = get;