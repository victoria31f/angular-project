import { Component } from '@angular/core';
import { AuthService } from './core/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public title = 'video-course-portal';

    constructor(public authService: AuthService) {}
}
