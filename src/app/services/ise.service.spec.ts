import { TestBed } from "@angular/core/testing";

import { IseService } from "./ise.service";

describe("IseService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: IseService = TestBed.get(IseService);
    expect(service).toBeTruthy();
  });
});
