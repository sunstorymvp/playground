import LazyComponent from './lazy-component.component';

describe('LazyComponent:', () => {
  describe('static handleModuleError():', () => {
    it('should throw', () => {
      expect(LazyComponent.handleModuleError).toThrow();
    });
  });
});
