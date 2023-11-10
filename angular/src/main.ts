import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { WrapperComponent } from './app/wrapper.component';
import { startsWith } from './app/router.utils';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        matcher: startsWith('childReact'),
        component: WrapperComponent,
        data: { importName: 'childReact', elementName: 'child-react-element' },
      },
    ]),
  ],
});
