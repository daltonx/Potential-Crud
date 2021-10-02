class Casting {
    static number(value) {
        return parseInt(value)
    }

    static string(value) {
        return value.toString()
    }

    static date(value) {
        return value.split('/').reverse().join('-')
    }

    static brldate(value) {
        return value.split('-').reverse().join('/')
    }
}

module.exports = Casting