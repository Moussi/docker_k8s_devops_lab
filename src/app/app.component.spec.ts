import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {
    beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
        RouterTestingModule
        ],
        declarations: [
        AppComponent,
        HeaderComponent
        ],
    }).compileComponents();
    }));

    it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    });
});