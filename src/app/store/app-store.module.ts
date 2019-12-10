import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { errorReducer, ErrorState } from '@store/reducers/errors.reducer';
import { AuthEffects } from '@app/store/effects/auth.effect';
import { AuthState, authReducer } from '@store/reducers/auth.reducer';

export interface AppState {
  error: ErrorState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  error: errorReducer,
  auth: authReducer
};

export const effects = [
  AuthEffects
];

// export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers),
    // StoreModule.forRoot(reducers, {
    //   // metaReducers,
    //   // runtimeChecks: {
    //   //   strictStateImmutability: true,
    //   //   strictActionImmutability: true
    //   // }
    // }),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule { }
