/**
 * reads the currently selected cell and applied "{quote}" after the
 * first newline character in the cell and before the end of the cell.
 */
function applyQuoteTagAfterFirstLine() {
  var cell = SpreadsheetApp.getActiveSpreadsheet().getCurrentCell();
  var value = cell.getValue();

  var splitArray = value.split("\n");
  splitArray.insert(1,"{quote}");
  splitArray.insert(splitArray.length, "{quote}");
  value = splitArray.join("\n");

  var CR = String.fromCharCode(13); // carriage return
  var LF = String.fromCharCode(10); // linefeed aka newline

  /* using CR instead of LF makes sure that quotes
   * do not appear when pasting into JIRA
   * while maintaining the separation by multiple lines
   */
  value = value.split(CR&LF).join(CR).split(LF).join(CR);

  cell.setValue(value);
}
