import LazyComponent from '.';

describe('LazyComponent:', () => {
  describe('static handleModuleError():', () => {
    it('should throw', () => {
      expect(LazyComponent.handleModuleError).toThrow();
    });
  });
});
