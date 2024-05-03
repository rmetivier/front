// user.selectors.ts

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const getUserState = createFeatureSelector<UserState>('user');

export const isLoggedIn    = createSelector(getUserState,(state: UserState) => state.isLoggedIn);
export const getUsername   = createSelector(getUserState,(state: UserState) => state.username);
export const getUser       = createSelector(getUserState,(state: UserState) => state);
export const getCategories = createSelector(getUserState,(state: UserState) => state.categories);
