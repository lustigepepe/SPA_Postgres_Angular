import { TestBed } from '@angular/core/testing';
import { RoomTableData } from './hotel-rooms.component';

describe('RoomTableData', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomTableData],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RoomTableData);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have the 'exxeta-front' title`, () => {
  //   const fixture = TestBed.createComponent(RoomTableData);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('exxeta-front');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(RoomTableData);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain(
  //     'Hello, exxeta-front'
  //   );
  // });
});
