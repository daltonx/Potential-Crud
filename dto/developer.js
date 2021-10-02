const DTO  = require('../util/dto')

const DeveloperRequestDTO = new DTO({
    nome: {
        type: 'string',
        required: true
    },
    sexo: {
        type: 'string',
        required: true
    },
    idade: {
        type: 'number',
        required: true,
        cast: true
    },
    datanascimento: {
        type: 'date',
        cast: true
    },
    hobby: {
        type: 'string'
    }
})

const DeveloperResponseDTO = new DTO({
    id: {
        type: 'number',
        cast: true
    },
    nome: {
        type: 'string',
        cast: true
    },
    sexo: {
        type: 'string',
        cast: true
    },
    idade: {
        type: 'number',
        cast: true
    },
    datanascimento: {
        type: 'brldate',
        cast: true
    },
    hobby: {
        type: 'string',
        cast: true
    }
})

const DeveloperSearchDTO = new DTO({
    nome: {
        type: 'string',
        cast: true,
        ignoreEmpty: true
    },
    sexo: {
        type: 'string',
        cast: true,
        ignoreEmpty: true
    },
    idade: {
        type: 'number',
        cast: true,
        ignoreEmpty: true
    },
    datanascimento: {
        type: 'date',
        cast: true,
        ignoreEmpty: true,
        ignoreInvalid: true
    },
    hobby: {
        type: 'string',
        cast: true,
        ignoreEmpty: true
    }
})

module.exports = {
    DeveloperRequestDTO,
    DeveloperResponseDTO,
    DeveloperSearchDTO
}