import { TestBed } from '@angular/core/testing';
import { ReceptionComponent } from './reception.component';

describe('ReceptionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ReceptionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have the 'exxeta-front' title`, () => {
  //   const fixture = TestBed.createComponent(ReceptionComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('exxeta-front');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(ReceptionComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain(
  //     'Hello, exxeta-front'
  //   );
  // });
});
