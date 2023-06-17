import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingService } from './messaging.service';
import { InjectionTokens} from './messaging.contract';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MessageBusModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: MessageBusModule,
      providers: [
        {
          provide: InjectionTokens.messagingServiceInjectionToken,
          useClass: MessagingService
        }
      ]
    };
  }
}
