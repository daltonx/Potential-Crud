const moment = require('moment')
moment.suppressDeprecationWarnings = true

class Validators {
    static boolean(value) { 
        return typeof(value) === 'boolean'
    }

    static string(value) { 
        return typeof(value) === 'string'
    }
    
    static number(value) {
        return typeof(value) === 'number' &&
        isFinite(value) &&
        !isNaN(value)
    }

    static date(value) {
        return /^(\d{4})-(\d{2})-(\d{2})/.test(value) &&
        !isNaN(new Date(value))
    }

    static isEmpty(value) {
        return value == undefined || value == ''
    }
}

module.exports = Validators