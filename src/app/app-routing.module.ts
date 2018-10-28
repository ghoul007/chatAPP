import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { signupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: "/login" },
  {
    path: "chat", canActivate: [AuthGuard],
    children: [
      { path: "", component: ChatComponent },
      { path: ":id", component: ChatComponent },
    ]
  },
  { path: "profile/:userId", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "profile/:userId/edit", component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: signupComponent },
  { path: "**", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
