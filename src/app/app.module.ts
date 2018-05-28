// MODULES (imports)
import { BrowserModule } from '@angular/platform-browser'; // runs your app in a browser
import { NgModule } from '@angular/core'; // decorator
import { FormsModule } from '@angular/forms'; // builds template driven forms (includes NgModel)
import { HttpClientModule } from '@angular/common/http'; // talks to a server
import { RouterModule, Routes } from '@angular/router'; // adds router directives and providers. */
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
// COMPONENTS (declarations)
import { AppComponent } from './app.component';
 // --pages
 import { HomepageComponent } from './pages/homepage/homepage.component';
 import { ChatComponent } from './pages/chat/chat.component';
 import { ProfileComponent } from './pages/profile/profile.component';
 // -- components
 import { LoginFormComponent } from './components/login-form/login-form.component';
 import { SignupFormComponent } from './components/signup-form/signup-form.component';

// SERVICES (providers)
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

// GUARDS (providers)
import { InitAuthGuardService } from './guards/init-auth-guard.service';
import { RequireAnonGuardService } from './guards/require-anon-guard.service';
import { RequireUserGuardService } from './guards/require-user-guard.service';

// Routes for <router-outlet>
// The canActivate method returns a boolean indicating whether or not navigation to a route should be allowed.
const routes:  Routes = [
  { path: '', component: HomepageComponent,  canActivate: [RequireAnonGuardService]},
  { path: 'chat', component: ChatComponent, canActivate: [RequireUserGuardService] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [InitAuthGuardService]}
];


/* the AppModule class with the @NgModule decorator */
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ChatComponent,
    ProfileComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'marketas' })
  ],
  providers: [AuthService, UserService, RequireUserGuardService, RequireAnonGuardService, InitAuthGuardService],
  bootstrap: [AppComponent]
})


export class AppModule { }
