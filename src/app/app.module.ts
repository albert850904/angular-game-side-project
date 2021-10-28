import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GaugeModule } from 'angular-gauge';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';
import { LoaderSpinnerComponent } from './UI/loader-spinner/loader-spinner.component';
import { LoaderSpinnerService } from './services/loader-spinner.service';
import { GameBadgeComponent } from './components/game-badge/game-badge.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    GameDetailsComponent,
    GameTabsComponent,
    LoaderSpinnerComponent,
    GameBadgeComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // third party
    GaugeModule.forRoot(),
    // Angular Material
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ScrollingModule,
    // skeleton
    NgxSkeletonLoaderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
      deps: [LoaderSpinnerService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [LoaderSpinnerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
