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

    testPort(port).then((isAvailable) => {
        if (isAvailable) {
            return callback(null, port);
        } else {
            findAvailablePort(max, min, callback);
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
function testPort(port) {
    return new Promise((resolve, reject) => {
        var isAvailable = false;

        var socket = net.createConnection({ port: port }, () => {
            resolve(isAvailable);
        });

        socket.on('error', () => {
            tryCreateServer(port).then((success) => {
                isAvailable = success;
                resolve(isAvailable);
            }).catch(reject);
        });
    })
}

/**
 * @method tryCreateServer
 * 
 * @param {Number} port 
 */
function tryCreateServer(port) {
    return new Promise((resolve) => {
        var server = net.createServer();

        server.on('error', () => {
            resolve(false);
        });

        server.listen(port, () => {
            server.close();
            resolve(true);
        });
    });
}

get().then(console.log)

module.exports.get = get;