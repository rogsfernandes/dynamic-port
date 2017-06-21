const chai = require('chai');
const proxyquire = require('proxyquire');

const dynamicPort = proxyquire('../../lib/index.js', {
    'net': {
        
    }
});

var expect = chai.expect;

describe('[Unit Test] Dynamic Port', () => {

    describe('Method = get()', () => {

        it('Should not throw', () => {
            expect(() => dynamicPort.get()).not.to.throw();
        })

        it('Should get a available port', (done) => {

        })

    })

    describe('Method = test()', () => {

    })

})