 /*************************************************************************
 * 
 * EQUATIONS WORK CONFIDENTIAL
 * __________________
 * 
 *  [2018] - [2020] Equations Work IT Services Private Limited, India
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Equations Work IT Services Private Limited and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Equations Work IT Services Private Limited
 * and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Equations Work IT Services Private Limited.
*
 * Copyright (C) Equations Work IT Services Pvt. Ltd.
 * NOTE: Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Owned and written by the proprietors of Equations Work IT Private Limited, India, August 2018
 */
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PipesService {

  constructor() { }
}

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if (value) {
          const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
          if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
              return 'Just now';
          const intervals:any = {
              'year': 31536000,
              'month': 2592000,
              'week': 604800,
              'day': 86400,
              'hour': 3600,
              'minute': 60,
              'second': 1
          };
          let counter;
          for (const i in intervals) {
              counter = Math.floor(seconds / intervals[i]);
              if (counter > 0)
                  if (counter === 1) {
                      return counter + ' ' + i + ' ago'; // singular (1 day ago)
                  } else {
                      return counter + ' ' + i + 's ago'; // plural (2 days ago)
                  }
          }
      }
      return value;
  }

}
@Pipe({
  name: 'assetsFilter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term:any): any {
    if (items === undefined) {
      return;
    }
    let term2 = '0';
      if (term === 'Image') {
        term = '1';
        term2 = '5';
      }
      if (term === 'Audio') {
        term = '3';
      }
      if (term === 'Video') {
        term = '2';
        term2 = '6';
      }
      if (term === '360Video') {
        term = '6';
        term2 = '2';
      }
      if (term === '360Image') {
        term = '5';
        term2 = '1';
      }
      return term
          ? items.filter(item => item.AssetType === term || item.AssetType === '4' || item.AssetType === term2)
          : items;
  }
}

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(items: any[], sortedBy: string): any {
     if (items) {
      return items.sort((a, b) => {
         return a[sortedBy] - b[sortedBy];
         });
     }
  }
}

@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {

  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  transform(bytes: number = 0, precision: number = 2 ): string {
    if ( isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes ) ) { return '?'; }

    let unit = 0;

    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }

    return bytes.toFixed( + precision ) + ' ' + this.units[ unit ];
  }
}

@Pipe({name: 'customFileSize'})
export class CustomFileSizePipe implements PipeTransform {

  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  transform(bytes: number = 0, precision: number = 0 ): string {
    if ( isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes ) ) { return '?'; }

    let unit = 0;

    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }

    return bytes.toFixed( + precision ) + ' ' + this.units[ unit ];
  }
}

// @Pipe({name: 'dateTime'})
// export class TimeInMin implements PipeTransform {
//   padTime(t) {
//     return t < 10 ? '0' + t : t;
// }

//     transform(times: number ): string {

//       if (typeof times !== 'number' || times < 0) {
//         return '00:00:00';
//       }

//   const hours = Math.floor(times / 3600),
//       minutes = Math.floor((times % 3600) / 60),
//       seconds = Math.floor(times % 60);


//     return this.padTime(hours) + ':' + this.padTime(minutes) + ':' + this.padTime(seconds);
//   }
// }
