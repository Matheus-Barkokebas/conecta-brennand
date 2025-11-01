import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DayCount {
  date: Date;
  label: string;
  count: number;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private formatDateLabel(d: Date): string {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  }

  generateNextDays(days = 14, base = 200, variability = 120): DayCount[] {
    const today = new Date();
    const arr: DayCount[] = [];
    for (let i = 1; i <= days; i++) {
      const d = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      const trend = Math.round(
        base + 10 * Math.sin(i / 2) + (Math.random() - 0.5) * variability
      );
      arr.push({
        date: d,
        label: this.formatDateLabel(d),
        count: Math.max(0, trend),
      });
    }
    return arr;
  }
  getNextDaysStream(days = 14, intervalMs = 5000): Observable<DayCount[]> {
    return timer(0, intervalMs).pipe(map(() => this.generateNextDays(days)));
  }
}
