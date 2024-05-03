 
import { createAction, props } from '@ngrx/store';

//export const login = createAction('[User] Login', props<{ username: string; password: string }>());
export const login = createAction('[User] Login', props<{ username: string,hashcode: string, categories:any }>());
export const logout = createAction('[User] Logout');

// add more actions as needed