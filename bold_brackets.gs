function boldBrackets(output_sheet_name) {
  if (!output_sheet_name) {
    output_sheet_name = "Output"; // Bold the brackets on the Output sheet
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var out_sheet = ss.getSheetByName(output_sheet_name);
  var range = out_sheet.getDataRange();
  var values = out_sheet.getDataRange().getValues();

  /* Sheet cells start at 1,1 */
  var i = 1;
  var j = 1;

  values.forEach(function (row) {
    i = 1;
    row.forEach(function (cell) {
      /* https://stackoverflow.com/q/3573915/5411712
       * $& is replaced with the regex
       *
       * https://stackoverflow.com/a/27213663/5411712
       * this link was helpful for figuring out negative look behind
       */

      //cell = cell.replace(new RegExp("[", 'g'), "*[");
      //cell = cell.replace(new RegExp("]", 'g'), "]*");
      cell = cell.replace(/((?!([ \*]))|^)\[[A-Za-z0-9\s]*\](?!\*)/g, "*$&*"); // do replace
      out_sheet.getRange(j, i).setValue(cell);
      Logger.log(cell);
//      if (cell.indexOf("[") > -1 && cell.indexOf("]") > -1) { // if cell contains "[" and "]"
//        cell = cell.replace(/(?<!\*)\[[A-Za-z0-9]*\](?!\*)/, "*[");                       // do replace
//        Logger.log(cell);
//        range.getCell(i, j).setValue(cell);
//      }
      i++;
    });
    j++;
  });

  //Logger.log(values);
  //range.setValues(values);
}
