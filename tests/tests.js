const request = require('supertest')
const { app } = require('../app')

describe('Potential CRUD', function() {
    var devId
    it('Criar desenvolvedor', function(done) {
        request(app)
        .post('/developers')
        .set('Content-Type', 'application/json')
        .send({
            nome: 'Dalton',
            sexo: 'M',
            idade: 99,
            hobby: 'Hobby',
            datanascimento: '10/10/2010'
        }).expect(201)
        .end(function(e, res) {
            if(e) return done(e)
            return done()
        })
    })
    
    it('Validacao rejeita input incorreto', function(done) {
        request(app)
        .post('/developers')
        .set('Content-Type', 'application/json')
        .send({
            nome: 'Dalton',
            sexo: 'M',
            idade: 'idade?',
            hobby: 'Hobby',
            datanascimento: '10/10/2010'
        }).expect(400)
        .end(function(e, res) {
            if(e) return done(e)
            return done()
        })
    })

    it('Listar desenvolvedores', function(done) {
        request(app)
        .get('/developers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(e, res) {
            devId = res.body[0].id
            if(e) return done(e)
            return done()
        })
    })

    it('Obter desenvolvedor', function(done) {
        request(app)
        .get('/developers/' + devId)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(e, res) {
            if(e) return done(e)
            return done()
        })
    })

    it('Filtrar desenvolvedores', function(done) {
        request(app)
        .get('/developers?nome=Dalton')
        .expect(200)
        .end(function(e, res) {
            if(e) return done(e)
            return done()
        })
    })

    it('Atualizar desenvolvedor', function(done) {
        const novoNome = `Dalton ${+ new Date()}`
        request(app)
        .put('/developers/' + devId)
        .set('Content-Type', 'application/json')
        .send({
            nome: novoNome,
            sexo: 'M',
            idade: 99,
            hobby: 'Hobby',
            datanascimento: '10/10/2010'
        }).expect(200)
        .end(function(e, res) {
            if(e) return done(e)
            request(app)
            .get('/developers/' + devId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(e, res) {
                if(res.body.nome != novoNome) return done('Nao atualizou')
                if(e) return done(e)
                return done()
            })
        })
    })

    it('Deletar desenvolvedor', function(done) {
        request(app)
        .delete('/developers/' + devId)
        .expect(204)
        .end(function(e, res) {
            if(e) return done(e)
            return done()
        })
    })
})