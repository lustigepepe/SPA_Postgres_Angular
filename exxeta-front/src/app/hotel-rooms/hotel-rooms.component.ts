import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RoomFilterService } from '../shared/room-filter.service';
import { RoomData, RoomDataService } from '../shared/room-data.service';

@Component({
  selector: 'hotel-room',
  standalone: true,
  imports: [CommonModule, CdkTableModule],
  templateUrl: './hotel-rooms.component.html',
  styleUrl: './hotel-rooms.component.less',
})
export class HotelRoomsComponent {
  roomFilter: boolean = false;
  constructor(
    private roomFilterService: RoomFilterService,
    private roomDataService: RoomDataService
  ) {}
  title = 'Rooms';
  tableData: RoomData[] = [];
  displayedColumns: string[] = [
    'roomNumber',
    'roomType',
    'miniBar',
    'available',
  ];

  dataSource = new RoomTableData(this.tableData);

  ngOnInit(): void {
    this.roomDataService.getAllRoomData().subscribe((tableData: RoomData[]) => {
      this.dataSource = new RoomTableData(tableData);
      this.tableData = tableData;
    });
    this.roomDataService.getAllRoomData().subscribe(console.log);
    this.roomFilterService.currentFilter.subscribe((roomFilter) => {
      this.roomFilter = roomFilter;
      if (roomFilter) {
        if (roomFilter) {
          this.dataSource.data
            .pipe(map((room) => room.filter((el) => el.available)))
            .subscribe(this.dataSource.data.next.bind(this.dataSource.data));
        }
      } else {
        this.dataSource = new RoomTableData(this.tableData);
      }
    });
  }
}

export class RoomTableData extends DataSource<RoomData> {
  constructor(private tableData: RoomData[]) {
    super();
    this.data = new BehaviorSubject<RoomData[]>(this.tableData);
  }
  data: BehaviorSubject<RoomData[]>;
  connect(): Observable<RoomData[]> {
    console.log('data: ', this.data);
    return this.data;
  }
  disconnect() {}
}
