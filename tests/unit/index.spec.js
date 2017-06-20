const chai = require('chai');
const dynamicPort = require('../../lib/index.js');

var expect = chai.expect;

describe('[Unit Test] Dynamic Port', () => {

    describe('Method = get()', () => {

        it('Should not throw', () => {
            expect(() => dynamicPort.get()).not.to.throw();
        })

    })

    describe('Method = test()', () => {

    })

})