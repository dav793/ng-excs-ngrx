import {Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';

import {
    Observable,
    Subject,
    interval
} from 'rxjs';

import {tap, takeUntil, finalize, take} from 'rxjs/operators';

import {State} from '../store/state';
// import {IncrementHome, IncrementVisitor, Reset} from '../store/actions/game.actions';

import {Game} from '../games/game.model';
import {UpdateGame} from '../store/actions/game.actions';

@Component({
    selector: 'app-scoreboard',
    templateUrl: './scoreboard.component.html',
    styleUrls: ['./scoreboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreboardComponent implements OnInit, OnDestroy {

    game$: Observable<Game>;
    destroy$ = new Subject();

    constructor(
        private store: Store<State>,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.id) {

                this.game$ = this.store
                    .select(state => state.games.all.find(g => g._id === params.id))

                this.changeDetector.detectChanges();

            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    scoreHome() {

        this.game$.pipe(take(1))
            .subscribe((game: Game) => {
                game.score.home += 1;
                this.store.dispatch(new UpdateGame(game));
            });

    }

    scoreVisitor() {

        this.game$.pipe(take(1))
            .subscribe((game: Game) => {
                game.score.visitor += 1;
                this.store.dispatch(new UpdateGame(game));
            });

    }

    resetScore() {

        this.game$.pipe(take(1))
            .subscribe((game: Game) => {
                game.score.home = 0;
                game.score.visitor = 0;
                this.store.dispatch(new UpdateGame(game));
            });

    }

}
