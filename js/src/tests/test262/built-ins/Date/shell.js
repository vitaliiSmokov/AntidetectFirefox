// file: assertRelativeDateMs.js
// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/**
 * Verify that the given date object's Number representation describes the
 * correct number of milliseconds since the Unix epoch relative to the local
 * time zone (as interpreted at the specified date).
 *
 * @param {Date} date
 * @param {Number} expectedMs
 */
function assertRelativeDateMs(date, expectedMs) {
  var actualMs = date.valueOf();
  var localOffset = date.getTimezoneOffset() * 60000;

  if (actualMs - localOffset !== expectedMs) {
    $ERROR(
      'Expected ' + date + ' to be ' + expectedMs +
      ' milliseconds from the Unix epoch'
    );
  }
}

// file: Date_constants.js
//Date_constants.js
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;

var msPerDay = 86400000;
var msPerSecond = 1000;
var msPerMinute = 60000;
var msPerHour = 3600000;

var date_1899_end = -2208988800001;
var date_1900_start = -2208988800000;
var date_1969_end = -1;
var date_1970_start = 0;
var date_1999_end = 946684799999;
var date_2000_start = 946684800000;
var date_2099_end = 4102444799999;
var date_2100_start = 4102444800000;

// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

//the following values are normally generated by the sputnik.py driver
var $LocalTZ,
    $DST_start_month,
    $DST_start_sunday,
    $DST_start_hour,
    $DST_start_minutes,
    $DST_end_month,
    $DST_end_sunday,
    $DST_end_hour,
    $DST_end_minutes;

(function () {
    /**
      * Finds the first date, starting from |start|, where |predicate|
      * holds.
      */
    var findNearestDateBefore = function(start, predicate) {
        var current = start;
        var month = 1000 * 60 * 60 * 24 * 30;
        for (var step = month; step > 0; step = Math.floor(step / 3)) {
            if (!predicate(current)) {
                while (!predicate(current))
                    current = new Date(current.getTime() + step);
                    current = new Date(current.getTime() - step);
                }
        }
        while (!predicate(current)) {
            current = new Date(current.getTime() + 1);
        }
        return current;
    };

    var juneDate = new Date(2000, 5, 20, 0, 0, 0, 0);
    var decemberDate = new Date(2000, 11, 20, 0, 0, 0, 0);
    var juneOffset = juneDate.getTimezoneOffset();
    var decemberOffset = decemberDate.getTimezoneOffset();
    var isSouthernHemisphere = (juneOffset > decemberOffset);
    var winterTime = isSouthernHemisphere ? juneDate : decemberDate;
    var summerTime = isSouthernHemisphere ? decemberDate : juneDate;

    var dstStart = findNearestDateBefore(winterTime, function (date) {
        return date.getTimezoneOffset() == summerTime.getTimezoneOffset();
    });
    $DST_start_month = dstStart.getMonth();
    $DST_start_sunday = dstStart.getDate() > 15 ? '"last"' : '"first"';
    $DST_start_hour = dstStart.getHours();
    $DST_start_minutes = dstStart.getMinutes();

    var dstEnd = findNearestDateBefore(summerTime, function (date) {
        return date.getTimezoneOffset() == winterTime.getTimezoneOffset();
    });
    $DST_end_month = dstEnd.getMonth();
    $DST_end_sunday = dstEnd.getDate() > 15 ? '"last"' : '"first"';
    $DST_end_hour = dstEnd.getHours();
    $DST_end_minutes = dstEnd.getMinutes();

    return;
})();