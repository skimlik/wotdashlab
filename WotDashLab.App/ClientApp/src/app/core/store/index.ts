import { createFeatureSelector } from '@ngrx/store';
import { ICoreState } from './core.state';

export const featureName = 'ApplicationCore';

export const coreFeatureSelector = createFeatureSelector<ICoreState>(featureName);
