import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { SharedModule } from 'app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { BotsSidebarModule } from '../bots-list/bots-sidebar/bots-sidebar.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChatbotAlertModule } from '../bots-list/chatbot-alert/chatbot-alert.module';
import { CreateChatbotModalModule } from '../bots-list/create-chatbot-modal/create-chatbot-modal.module';
import { CreateFlowsModalModule } from '../bots-list/create-flows-modal/create-flows-modal.module';

const routes: Routes = [
  { path: "", component: TemplatesComponent},
];

@NgModule({
  declarations: [
    TemplatesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ChatbotAlertModule,
    CreateChatbotModalModule,
    CreateFlowsModalModule,
    TranslateModule,
    BotsSidebarModule,
    FormsModule,
    MomentModule,
    MatTooltipModule
  ]
})
export class TemplatesModule { }
