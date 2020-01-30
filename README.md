# DateFinder

<a name="top"></a>
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="overview"></a>

# Overview

**DateFinder is a GAS library for searching the date objects from the cell range on the sheet in the Spreadsheet and retrieving the searched range as the RangeList object using Google Apps Script (GAS).**

<a name="description"></a>

## Description

There is [the Class TextFinder](https://developers.google.com/apps-script/reference/spreadsheet/text-finder) for searching the text from cells of the Spreadsheet using the Google Apps Script. But in this case, the date object in the cell is used as the string. Namely, the values for searching are used as the same with the values retrieved by [`getDisplayValues()`](https://developers.google.com/apps-script/reference/spreadsheet/range#getdisplayvalues). So for example, when there are the date objects in the cells with the various formats, the date cannot be searched by the Class TextFinder. So I created this library. When this library is used, the date objects in the cells can be retrieved by the date object and/or the range between 2 dates.

# Library's project key

```
17ghJiHk43mDeFqYYQRc7YMfTRv9hMNk0dkJ2rudZmJUMaopR0gvS9B01
```

# Methods

| Methods                   | Description                                      |
| :------------------------ | :----------------------------------------------- |
| [search(object)](#search) | Search date objects and return RangeList object. |

<a name="usage"></a>

# Usage:

## 1. Install library

In order to use this library, please install this library as follows.

1. Create a GAS project.

   - You can use this library for the GAS project of both the standalone type and the container-bound script type.

1. [Install DateFinder library](https://developers.google.com/apps-script/guides/libraries).

   - Library's project key is **`17ghJiHk43mDeFqYYQRc7YMfTRv9hMNk0dkJ2rudZmJUMaopR0gvS9B01`**.

### About scopes

This library use the scope of `https://www.googleapis.com/auth/spreadsheets`.

<a name="search"></a>

## 2. Method: `search`

In this method, the date objects in the cells are searched from the sheet of Spreadsheet.

### Sample script 1

```javascript
var spreadsheetId = "###";
var sheetName = "Sheet1";

var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
var range = sheet.getRange("A1:C10");
var from = new Date();
from.setDate(from.getDate() - 1);
var to = new Date();

var object = { sheet: sheet, range: range, from: from, to: to };
var res = DateFinder.search(object);
res.getRanges().forEach(function(range) {
  Logger.log("%s, %s", range.getA1Notation(), range.getValue());
});
```

- In this sample script, the ranges and values of date from "now" to "now - 1" day are retrieved from the range of "A1:C10" on "Sheet1" in the Spreadsheet of "###".

- **`DateFinder.search(object)` returns [RangeList](https://developers.google.com/apps-script/reference/spreadsheet/range-list).**

- If `var object = { sheet: sheet, range: range, from: from};` is used, all date values after `from` are retrieved.

- If `var object = { sheet: sheet, range: range, to: to};` is used, all date values before `to` are retrieved.

- If `var object = { sheet: sheet, range: range, date: date};` is used, date values which are the same with `date` are retrieved.

- If `var object = { sheet: sheet, date: date};` is used, date values which are the same with `date` are retrieved from the data range on `sheet`.

- If `var object = { range: range, date: date};` is used, date values which are the same with `date` are retrieved from `range` on the active sheet of the active Spreadsheet..

- If `var object = {date: date};` is used, date values which are the same with `date` are retrieved from the data range on the active sheet of the active Spreadsheet.

- When `from`, `to` and `date` are required to be the date object.

- When all `from`, `to` and `date` are not included in the object, an error occurs.

- When the results don't match with the search parameter, `null` is returned.

### Sample script 2

```javascript
var spreadsheetId = "###";
var sheetName = "Sheet1";

var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

var obj = { sheet: sheet, date: new Date("2020/01/01") };
var res = DateFinder.search(obj);
res.setBackground("red");
```

- In this sample script, the ranges and values of `date` (In this case, it's `2020/01/01 00:00:00`.) are retrieved from the data range on "Sheet1" in the Spreadsheet of "###". And the background color of searched range is changed to the red color.

---

## Reference

- [Class RangeList](https://developers.google.com/apps-script/reference/spreadsheet/range-list)

<a name="licence"></a>

# Licence

[MIT](LICENCE)

<a name="author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

If you have any questions and commissions for me, feel free to tell me.

<a name="updatehistory"></a>

# Update History

- v1.0.0 (January 30, 2020)

  1. Initial release.

[TOP](#top)
