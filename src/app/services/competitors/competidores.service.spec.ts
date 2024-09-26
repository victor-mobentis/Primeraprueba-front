import { TestBed } from "@angular/core/testing";
import { CompetidoresService } from "./competidores.service";

describe('CompetidoresService', () =>{
    let service: CompetidoresService;
    beforeEach(() =>{
        TestBed.configureTestingModule({});
        service = TestBed.inject(CompetidoresService);
    });

    it('should be created', () =>{
        expect(service).toBeTruthy();
    });
});