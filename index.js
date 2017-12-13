module.exports = (publicKey, secure) => {
    let rt = require('socket.io-client')('http'+(secure?'s':'')+'://postquick.startnet.co?key='+publicKey, {
        pingTimeout: 30000,
        timeout: 30000
    })

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
        pushSubscribe: (token, channels, os) => {
            channels = Array.isArray(channels)?channels:[channels]
            os = os === 'android'?1:(os === 'ios'?2:3)
            rt.emit('_pushSubscribe', {
                token,
                channels,
                os
            })
        },
        pushSender: (callback) => {
            rt.emit('_pushSender')
            rt.on('_pushSender', callback||()=>{})
        }
    }
}
