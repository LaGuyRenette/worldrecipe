import { TestBed } from '@angular/core/testing';

import { CrudRecipeService } from './crud-recipe.service';

describe('CrudRecipeService', () => {
  let service: CrudRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
