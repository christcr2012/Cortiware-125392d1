// packages/verticals/src/index.ts (v3.9 registry)
export type EstimateResult = {
  total: number;
  lines: Array<{ sku: string; qty: number; unit?: number; total?: number }>;
  warnings: string[];
};

export interface VerticalPack {
  key: string;
  getForm(formKey: string, orgId: string): any;
  getPriceBook(orgId: string): any; // Can be array or object with skus
  estimate(inputs: Record<string, any>): EstimateResult;
}

// Import all packs
import * as cleaning from './packs/cleaning';
// Phase-2 + Generics

// Registry exposing all verticals
export const verticalsRegistry: Record<string, VerticalPack> = {
  'cleaning': cleaning.pack,
};

// Helper functions
export function getForm(verticalKey: string, formKey: string, orgId: string) {
  const pack = verticalsRegistry[verticalKey];
  if (!pack) throw new Error(`Unknown vertical ${verticalKey}`);
  return pack.getForm(formKey, orgId);
}

export function getPriceBook(verticalKey: string, orgId: string) {
  const pack = verticalsRegistry[verticalKey];
  if (!pack) throw new Error(`Unknown vertical ${verticalKey}`);
  return pack.getPriceBook(orgId);
}

export function estimate(verticalKey: string, inputs: Record<string, any>): EstimateResult {
  const pack = verticalsRegistry[verticalKey];
  if (!pack) throw new Error(`Unknown vertical ${verticalKey}`);
  return pack.estimate(inputs);
}

export default verticalsRegistry;

