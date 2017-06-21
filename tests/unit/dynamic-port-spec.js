const chai = require('chai');
const proxyquire = require('proxyquire');

let dynamicPort = proxyquire('../../lib/index.js', {
    'net': {
        createConnection: () => {
            return {
                on: (eventName, cb) => {
                    cb();
                }
            };
        },
        createServer: () => {
            return {
                on: () => {
                },
                listen: (port, cb) => {
                    cb();
                },
                close: () => {

                }
            }
        }
    }
});

var expect = chai.expect;

describe('[Unit Test] Dynamic Port', () => {

    describe('Method = get()', () => {

        it('Should not throw', () => {
            expect(() => dynamicPort.get()).not.to.throw();
        })

        it('Should get a available port', (done) => {
            dynamicPort.get(9999).then(port => {
                expect(port).to.be.a('Number');
                expect(port.toString().length).to.equal(4);
                done();
            })
        })
    })
})