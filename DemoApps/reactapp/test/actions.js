import 'babel-polyfill';
import expect from 'expect';
import { addTodo } from '../src/actions';


describe('actions', function() {
  describe('addTodo', function() {
      it('returns a TODO action  ', function () {
        let action = addTodo("Test");
        expect(action.type).toEqual("ADD_TODO");
        expect(action.text).toEqual("Test");
      });
  });
});