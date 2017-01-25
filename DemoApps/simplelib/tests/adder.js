import 'babel-polyfill';
import expect from 'expect';
import { add } from '../src/adder';


describe('adder', function() {
  describe('add', function() {
      it('adds two numbers', function () {
        expect(add(1, 1)).toEqual(2);
      }); 
  });
});