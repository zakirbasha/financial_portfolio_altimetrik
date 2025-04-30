import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.endsWith('/api/assets')) {
    return of(new HttpResponse({
      status: 200,
      body: {
        data: [{
          label: 'Equity',
          value: 5000
        }, {
          label: 'Debt',
          value: 3000
        }, {
          label: 'Real Estate',
          value: 2000
          }, {
          label: 'FD',
            value: 1000
          }, {
            label: 'Gold',
            value: 5000
          }]
      }
    }));
  }
  return next(req);
};
