const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../../src/index.js');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Flight Path Microservice Integration Tests', () => {
    it('should return the correct start and end airports for a single flight', (done) => {
        chai.request(app)
            .post('/calculate')
            .send({ flights: [['SFO', 'EWR']] })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equal({ start: 'SFO', end: 'EWR' });
                done();
            });
    });

    it('should return the correct start and end airports for multiple flights', (done) => {
        chai.request(app)
            .post('/calculate')
            .send({ flights: [['ATL', 'EWR'], ['SFO', 'ATL']] })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equal({ start: 'SFO', end: 'EWR' });
                done();
            });
    });

    it('should return the correct start and end for complex flight path', (done) => {
        chai.request(app)
            .post('/calculate')
            .send({ flights: [['IND', 'EWR'], ['SFO', 'ATL'], ['GSO', 'IND'], ['ATL', 'GSO']] })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.equal({ start: 'SFO', end: 'EWR' });
                done();
            });
    });

    it('should return an error for invalid flight path', (done) => {
        chai.request(app)
            .post('/calculate')
            .send({ flights: [['SFO', 'EWR'], ['FOO', 'BAR']] })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: 'No valid flight path found.' });
                done();
            });
    });

    it('should return an error for invalid input format', (done) => {
        chai.request(app)
            .post('/calculate')
            .send({ flights: [['SFO', 'EWR'], ['ATL']] })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.deep.equal({ error: 'Invalid input format. Please provide an array of flight pairs.' });
                done();
            });
    });
});