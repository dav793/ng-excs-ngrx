import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { GameEffects } from './store/effects/game.effects';
import { gameReducer } from './store/reducers/game.reducer';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { GamesService } from './games/games.service';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GamesListComponent } from './games-list/games-list.component';

@NgModule({
    declarations: [
        AppComponent,
        ScoreboardComponent,
        GamesListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot({ games: gameReducer }),
        EffectsModule.forRoot([GameEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,                       // Retains last 25 states
            logOnly: environment.production,  // Restrict extension to log-only mode in production
        })
    ],
    providers: [
        GamesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
