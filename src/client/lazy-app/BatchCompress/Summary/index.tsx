/**
 * Resumen de estadísticas de compresión por lote
 */
import { h, Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import { formatBytes, calculateSavings } from '../utils';

interface Props {
  totalOriginalSize: number;
  totalCompressedSize: number;
}

export default class Summary extends Component<Props> {
  render({ totalOriginalSize, totalCompressedSize }: Props) {
    const savings = calculateSavings(totalOriginalSize, totalCompressedSize);
    const savingsValue = parseFloat(savings.replace('%', ''));

    return (
      <div class={style.summary}>
        <div class={style.summaryCard}>
          <div class={style.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
          </div>
          <div class={style.content}>
            <span class={style.label}>Tamaño Original</span>
            <strong class={style.value}>
              {formatBytes(totalOriginalSize)}
            </strong>
          </div>
        </div>

        <div class={style.summaryCard}>
          <div class={style.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-6-4H4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div class={style.content}>
            <span class={style.label}>Tamaño Comprimido</span>
            <strong class={style.value}>
              {formatBytes(totalCompressedSize)}
            </strong>
          </div>
        </div>

        <div class={style.summaryCard}>
          <div class={style.icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              <polyline points="17 18 23 18 23 12" />
            </svg>
          </div>
          <div class={style.content}>
            <span class={style.label}>Ahorro Total</span>
            <strong
              class={`${style.value} ${style.savings} ${
                savingsValue > 50 ? style.highSavings : ''
              }`}
            >
              {savings}
            </strong>
          </div>
        </div>
      </div>
    );
  }
}
