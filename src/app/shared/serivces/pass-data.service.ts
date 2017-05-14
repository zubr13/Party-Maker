import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class PassDataService {
  public subject : BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }

}
