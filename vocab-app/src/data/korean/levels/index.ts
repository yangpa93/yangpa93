/**
 * 국어 레벨 24개를 한데 모은다.
 *
 * 이 파일은 scripts/korean/build-levels.mjs 가 만든다. 직접 고치지 않는다.
 */

import { KoEntry } from '../../../types';
import { KO_M1_1 } from './m1-1';
import { KO_M1_2 } from './m1-2';
import { KO_M1_3 } from './m1-3';
import { KO_M1_4 } from './m1-4';
import { KO_M2_1 } from './m2-1';
import { KO_M2_2 } from './m2-2';
import { KO_M2_3 } from './m2-3';
import { KO_M2_4 } from './m2-4';
import { KO_M3_1 } from './m3-1';
import { KO_M3_2 } from './m3-2';
import { KO_M3_3 } from './m3-3';
import { KO_M3_4 } from './m3-4';
import { KO_H1_1 } from './h1-1';
import { KO_H1_2 } from './h1-2';
import { KO_H1_3 } from './h1-3';
import { KO_H1_4 } from './h1-4';
import { KO_H2_1 } from './h2-1';
import { KO_H2_2 } from './h2-2';
import { KO_H2_3 } from './h2-3';
import { KO_H2_4 } from './h2-4';
import { KO_H3_1 } from './h3-1';
import { KO_H3_2 } from './h3-2';
import { KO_H3_3 } from './h3-3';
import { KO_H3_4 } from './h3-4';

export const KO_ENTRIES: KoEntry[] = [
  ...KO_M1_1,
  ...KO_M1_2,
  ...KO_M1_3,
  ...KO_M1_4,
  ...KO_M2_1,
  ...KO_M2_2,
  ...KO_M2_3,
  ...KO_M2_4,
  ...KO_M3_1,
  ...KO_M3_2,
  ...KO_M3_3,
  ...KO_M3_4,
  ...KO_H1_1,
  ...KO_H1_2,
  ...KO_H1_3,
  ...KO_H1_4,
  ...KO_H2_1,
  ...KO_H2_2,
  ...KO_H2_3,
  ...KO_H2_4,
  ...KO_H3_1,
  ...KO_H3_2,
  ...KO_H3_3,
  ...KO_H3_4,
];
