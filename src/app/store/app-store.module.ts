import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { errorReducer, ErrorState } from '@store/reducers/errors.reducer';
import { AuthEffects } from '@app/store/effects/auth.effect';
import { AuthState, authReducer } from '@store/reducers/auth.reducer';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import { RouterStateUrl, CustomSerializer } from '@store/reducers/router.reducer';
import { environment } from '@env/environment';

export interface AppState {
  error: ErrorState;
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  error: errorReducer,
  auth: authReducer,
  router: routerReducer
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
    StoreRouterConnectingModule.forRoot({
      // serializer: CustomSerializer,
      // navigationActionTiming: NavigationActionTiming.PreActivation,
      // routerState: RouterState.Full,
    }),
    // StoreModule.forRoot(reducers, {
    //   // metaReducers,
    //   // runtimeChecks: {
    //   //   strictStateImmutability: true,
    //   //   strictActionImmutability: true
    //   // }
    // }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [{
    provide: RouterStateSerializer,
    useClass: CustomSerializer
  }]
})
export class AppStoreModule { }
