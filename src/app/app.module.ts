import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpIntercepterService } from './services/http-intercepter.service';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule} from '@angular/material/input';
import {NgxPaginationModule} from 'ngx-pagination';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    CartComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    LoadingBarModule,
    NgxPaginationModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
