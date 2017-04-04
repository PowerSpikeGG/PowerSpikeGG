import { TestBed, inject } from '@angular/core/testing';

import { GatewayService } from './gateway.service';

describe('Gateway2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatewayService]
    });
  });

  it('should ...', inject([GatewayService], (service: GatewayService) => {
    expect(service).toBeTruthy();
  }));
});
