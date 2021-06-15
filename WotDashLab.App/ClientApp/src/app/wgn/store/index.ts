import { createFeatureSelector } from "@ngrx/store";
import { IWgnState } from "./wgn.state";

export const featureName = 'Wgn';

export const wgnFeatureSelector = createFeatureSelector<IWgnState>(featureName);
