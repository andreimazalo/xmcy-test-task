import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCardComponent } from './image-card.component';
import { MatCardModule } from '@angular/material/card';
import { By, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

describe('ImageCardComponent', () => {
  let component: ImageCardComponent;
  let fixture: ComponentFixture<ImageCardComponent>;
  const sanitizerSpy = {
    bypassSecurityTrustUrl: jasmine.createSpy('bypassSecurityTrustUrl').and.callFake((url: string) => {
      return 'mock url' as SafeUrl;
    }),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCardComponent ],
      providers: [
        {provide: DomSanitizer, useValue: sanitizerSpy}
      ],
      imports: [
        MatCardModule,
        MatIconModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when ImageCardComponent receives a blob to display', () => {
    it('should create insert it into DOM for display', () => {
      const getImageDOMLinkSpy = spyOn(component, 'getImageDOMLink');
      component.imgSrc = new Blob();

      component.ngOnChanges({imgSrc: {}} as unknown as SimpleChanges);

      expect(getImageDOMLinkSpy).toHaveBeenCalled();
    });
  });

  describe('when ImageCardComponent is hovered', () => {
    it('should display click action text', () => {
      component.clickActionText = 'Test text';
      const imageCard = fixture.debugElement.query(By.css('[data-test=xmcy-image-card]'));
      imageCard.triggerEventHandler('mouseover');

      fixture.detectChanges();
      const hoverActionTextElem = fixture.debugElement.query(By.css('[data-test=image-card-action-text]'));

      expect(hoverActionTextElem.nativeElement.innerHTML).toContain('Test text');
    });
  });

  describe('when ImageCardComponent is NOT hovered', () => {
    it('should NOT display click action text', () => {
      component.clickActionText = 'Test text';
      fixture.detectChanges();

      const hoverActionText = fixture.debugElement.query(By.css('[data-test=image-card-action-text]'));

      expect(hoverActionText).toBeNull();
    });
  });

  describe('when ImageCardComponent is hovered and clicked', () => {
    it('should display after action text', () => {
      const imageCard = fixture.debugElement.query(By.css('[data-test=xmcy-image-card]'));
      component.clickActionText = 'Test text';
      component.afterActionText = 'After action text';
      imageCard.triggerEventHandler('mouseover');
      imageCard.triggerEventHandler('click');

      fixture.detectChanges();
      const hoverActionTextElem = fixture.debugElement.query(By.css('[data-test=image-card-action-done-text]'));

      expect(hoverActionTextElem.nativeElement.innerHTML).toContain('After action text');
    });
  });
});
