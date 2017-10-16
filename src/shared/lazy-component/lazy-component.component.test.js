import LazyComponent from './lazy-component.component';

describe('LazyComponent:', () => {
  it('static handleModuleError should throw', () => {
    expect(LazyComponent.handleModuleError).toThrow();
  });
});
