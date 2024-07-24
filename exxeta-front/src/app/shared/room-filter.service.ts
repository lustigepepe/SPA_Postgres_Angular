import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomFilterService {
  private filterRooms = new BehaviorSubject(false);
  currentFilter = this.filterRooms.asObservable();

  constructor() {}

  changeFilter(filterValue: boolean) {
    this.filterRooms.next(filterValue);
  }
}
