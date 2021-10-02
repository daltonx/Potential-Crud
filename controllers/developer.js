const { Developer } = require('../data/models')
const { DeveloperRequestDTO, DeveloperResponseDTO, DeveloperSearchDTO } = require('../dto/developer')

class DeveloperController {
    static async list(req, res) {
        const { page = 1 } = req.query
        const where = DeveloperSearchDTO.map(req.query)
        const developers = await Developer.findAll({
            raw: true,
            offset: (page - 1) * 10,
            limit: 10,
            where
        })
        if(Object.keys(where).length && !developers.length) return res.status(404).send() 
        res.json(DeveloperResponseDTO.mapArray(developers))
    }

    static async get(req, res) {
        const { id } = req.params
        const developer = await Developer.findByPk(id)
        if(!developer) return res.status(404).send()
        res.json(DeveloperResponseDTO.map(developer))
    }

    static async create(req, res) {
        const { valid, data, errors } = DeveloperRequestDTO.validMap(req.body)
        if(!valid) return res.status(400).json(errors)
        await Developer.create(data)
        res.status(201).send()
    }

    static async update(req, res) {
        const { id } = req.params
        const { valid, data, errors } = DeveloperRequestDTO.validMap(req.body)
        if(!valid) return res.status(400).json(errors)
        const [ updated ] = await Developer.update(data, {
            where: {
                id
            }
        })
        res.status(updated && 200 || 400).send()
    }

    static async delete(req, res) {
        const { id } = req.params
    
        const deleted = await Developer.destroy({
            where: {
                id
            }
        })
    
        res.status(deleted && 204 || 400).send()
    }
}

module.exports = DeveloperController