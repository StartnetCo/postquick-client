module.exports = (publicKey) => {
    let rt = require('socket.io-client')('http://postquick.startnet.co?key='+publicKey);

    return {
        on: (eventName, callback) => {
            rt.on(eventName, callback)
        },
        emit: (eventName, value, configurations) => {
            rt.emit(eventName, value, configurations)
        },
        close: () => {
            rt.close()
        },
        removeListener: (eventName, callback) => {
            rt.removeListener(eventName, callback)
        },
        pushSubscribe: (token, channels) => {
            channels = Array.isArray(channels)?channels:[channels]
            rt.emit('_pushSubscribe', {
                token,
                channels
            })
        }
    }
}
