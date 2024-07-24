import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface RoomData {
  id: number;
  roomType: string;
  roomNumber: number;
  miniBar: string;
  available: boolean;
}

export const tableData: RoomData[] = [
  {
    id: 0,
    roomNumber: 1,
    roomType: 'single room',
    miniBar: 'yes',
    available: true,
  },
  {
    id: 2,
    roomNumber: 2,
    roomType: 'doppel room',
    miniBar: 'yes',
    available: true,
  },
  {
    id: 3,
    roomNumber: 3,
    roomType: 'suite',
    miniBar: 'no',
    available: false,
  },
];

@Injectable({ providedIn: 'root' })
export class RoomDataService {
  private roomsBaseUrl = 'http://localhost:8080/api/v2/rooms'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAllRoomData(): Observable<RoomData[]> {
    return this.http.get<RoomData[]>(this.roomsBaseUrl).pipe(
      tap((_) => this.log('fetched rooms')),
      catchError(this.handleError<RoomData[]>('getAllRoomData', []))
    );
  }

  /** GET room by id. Will 404 if id not found */
  getRoomDataById(id: number): Observable<RoomData> {
    const url = `${this.roomsBaseUrl}/${id}`;
    return this.http.get<RoomData>(url).pipe(
      tap((_) => this.log(`fetched room id=${id}`)),
      catchError(this.handleError<RoomData>(`getRoomDataById id=${id}`))
    );
  }

  //////// CRUD methods //////////
  createRoomData(room: RoomData): Observable<RoomData> {
    return this.http
      .post<RoomData>(this.roomsBaseUrl, room, this.httpOptions)
      .pipe(
        tap((newRoomData: RoomData) =>
          this.log(`added room w/ id=${newRoomData.id}`)
        ),
        catchError(this.handleError<RoomData>('createRoomData'))
      );
  }

  deleteRoomData(id: number): Observable<RoomData> {
    const url = `${this.roomsBaseUrl}/${id}`;

    return this.http.delete<RoomData>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted room id=${id}`)),
      catchError(this.handleError<RoomData>('deleteRoomData'))
    );
  }

  updateRoomData(room: RoomData): Observable<any> {
    return this.http.put(this.roomsBaseUrl, room, this.httpOptions).pipe(
      tap((_) => this.log(`updated room id=${room.id}`)),
      catchError(this.handleError<any>('updateRoomData'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`room service: ${message}`);
  }
}
@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
