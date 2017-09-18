import { TestBed, inject } from '@angular/core/testing';

import { ImagesSrvService } from './images-srv.service';

describe('ImagesSrvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImagesSrvService]
    });
  });

  it('should be created', inject([ImagesSrvService], (service: ImagesSrvService) => {
    expect(service).toBeTruthy();
  }));
});
