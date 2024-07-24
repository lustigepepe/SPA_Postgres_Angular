import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  FormBuilder,
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RoomFilterService } from '../shared/room-filter.service';
import { RoomData, RoomDataService } from '../shared/room-data.service';

export interface Room {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'reception',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.less',
})
export class ReceptionComponent {
  constructor(
    private roomFilterService: RoomFilterService,
    private roomDataService: RoomDataService,
    private fb: FormBuilder
  ) {
    this.roomDataService.getAllRoomData().subscribe((tableData: RoomData[]) => {
      this.tableData = tableData;
      console.log('sub: ', tableData);
    });

    this.editRoomForm = this.fb.group({
      roomNumber: new FormControl(),
      roomType: new FormControl(),
      minibar: new FormControl(),
      available: new FormControl(),
    });
    // this.createForm = this.fb.group({
    //   roomNumber: new FormControl(),
    //   roomType: new FormControl(),
    //   minibar: new FormControl(),
    //   available: new FormControl(),
    // });
    // this.deleteForm = this.fb.group({
    //   roomNumber: new FormControl(),
    // });
  }
  title = 'Reception';
  hideEditRoom = 'none';
  hideCreateRoom = 'none';
  hideDeleteRoom = 'none';
  hideButtonDefault = '';
  availableModeOn = '';

  roomNumber: boolean | undefined;
  roomType: boolean | undefined;
  minibar: boolean | undefined;
  available: boolean | undefined;

  editRoomForm: FormGroup;
  // createForm;
  // deleteForm;

  tableData: RoomData[] = [];

  changedAvailable() {
    if (this.available) {
      this.available = false;
    } else {
      this.available = true;
    }
  }
  changedMinibar() {
    if (this.minibar) {
      this.minibar = false;
    } else {
      this.minibar = true;
    }
  }
  createNewRoomFlag = false;
  editRoomFlag = false;
  deleteRoomsFlag = false;
  onSubmit() {
    console.log('ll: ', this.editRoomForm.value);
    // this.editRoomForm.value.filter((obj:RoomData) => {obj.});
    // this.tableData
    const selectedRoomNumber = this.editRoomForm.value.roomNumber as number;
    console.log('jj: ', this.tableData);
    let editRoomObject = this.tableData.filter((room: RoomData) => {
      console.log('room.roomNumber: ', room.roomNumber);
      console.log('selectedRoomNumber: ', selectedRoomNumber);
      console.log(typeof room.roomNumber, typeof selectedRoomNumber);
      console.log(
        'room.roomNumber === selectedRoomNumber: ',
        room.roomNumber === selectedRoomNumber
      );

      room.roomNumber === selectedRoomNumber;
    });
    console.log('after editRoom: ', typeof this.editRoomForm.value.roomType);
    console.log('after editRoom: ', this.editRoomForm.value.roomType);

    this.closeEditGetFormData();
  }
  closeEditGetFormData() {
    this.finishEditingRooms();
    console.log('hideEditRoom');

    if (this.editRoomFlag) {
      console.log('hideEditRoom: ', this.hideEditRoom);

      this.editRoomFlag = false;
    }
    if (this.createNewRoomFlag) {
      console.log('hideEditRoom: ', this.hideEditRoom);

      this.createNewRoomFlag = false;
    }
    if (this.deleteRoomsFlag) {
      console.log('hideEditRoom: ', this.hideEditRoom);

      this.deleteRoomsFlag = false;
    }
  }
  finsh() {
    this.closeEditGetFormData();
  }
  rooms: Room[] = [
    { value: 'singleRoom', viewValue: 'Single room' },
    { value: 'doppelRoom', viewValue: 'Doppel room' },
    { value: 'suite', viewValue: 'Suite' },
  ];
  clickAvailable() {
    this.availableModeOn
      ? (this.availableModeOn = '')
      : (this.availableModeOn = 'none');
    this.roomFilterService.changeFilter(this.availableModeOn ? true : false);
  }
  editRoom() {
    this.editRoomFlag = true;
    this.hideEditRoom = '';
    this.hideCreateRoom = 'none';
    this.hideButtonDefault = 'none';
  }
  createNewRoom() {
    this.createNewRoomFlag = true;
    this.hideEditRoom = 'none';
    this.hideCreateRoom = '';
    this.hideButtonDefault = 'none';
  }
  finishEditingRooms() {
    this.hideCreateRoom = 'none';
    this.hideEditRoom = 'none';
    this.hideDeleteRoom = 'none';

    this.hideButtonDefault = '';
  }
  deleteRoom() {
    console.log('deleteRoom');
    this.deleteRoomsFlag = true;
    this.hideCreateRoom = 'none';
    this.hideEditRoom = 'none';
    this.hideButtonDefault = 'none';
    this.hideDeleteRoom = '';
  }
}
