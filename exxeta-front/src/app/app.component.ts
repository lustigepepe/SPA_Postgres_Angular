import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelRoomsComponent } from './hotel-rooms/hotel-rooms.component';
import { ReceptionComponent } from './reception/reception.component';
import { RoomFilterService } from './shared/room-filter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HotelRoomsComponent, ReceptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [RoomFilterService],
})
export class AppComponent {
  title = 'Hotel-Loneliness';
  constructor(private roomFilterService: RoomFilterService) {}
}
