import { TestBed } from '@angular/core/testing';

import { UserLogged.GuardService } from './user-logged.guard.service';

describe('UserLogged.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserLogged.GuardService = TestBed.get(UserLogged.GuardService);
    expect(service).toBeTruthy();
  });
});
