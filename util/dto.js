const Validators = require('./validators')
const Casting = require('./casting')

class DTO {
    constructor(attributes) {
        this.attributes = attributes
    }
    
    mapArray(source) {
        return source.map(entry => this.map(entry))
    }

    map(source) {
        const data = {}
        for(const [ name, { 
            type, 
            cast = false,
            ignoreEmpty = false,
            ignoreInvalid = false
        } ] of Object.entries(this.attributes)) {
            const sourceValue = source[name] || ''
            const value = cast && Casting[type](sourceValue) || sourceValue
            if(ignoreEmpty && Validators.isEmpty(value)) continue
            if(ignoreInvalid && !Validators[type](value)) continue
            data[name] = value
        }
        return data
    }

    validMap (source) {
        const data = {}
        const errors = {}

        for(const [ name, {
            type, 
            required = false,
            cast = false,
            ignoreEmpty = false,
            ignoreInvalid = false
        } ] of Object.entries(this.attributes)) {
            const sourceValue = source[name] || ''
            const value = cast && Casting[type](sourceValue) || sourceValue
            if(ignoreEmpty && Validators.isEmpty(value)) continue
            if(ignoreInvalid && !Validators[type](value)) continue
            if(required && Validators.isEmpty(value)) {
                errors[name] = 'this field is required'
                continue
            }
            if(!Validators[type](value)) {
                errors[name] = `must be a valid ${type}`
                continue
            }
            data[name] = value
        }

        return Object.keys(errors).length ? {
            valid: false,
            errors
        } : {
            valid: true,
            data
        }
    }
}

module.exports = DTO