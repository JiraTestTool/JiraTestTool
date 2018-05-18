/**
 * This function resets the Input Sheet and wipes to default
 */
function resetSheet(input_sheet_name) {
  if (!input_sheet_name) {
    input_sheet_name = "Input"; // Reset Input sheet...
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var in_sheet = ss.getSheetByName(input_sheet_name);

  in_sheet.clear();
  in_sheet.setRowHeights(1, 15, 21);    // reset to default heights "21"
  in_sheet.setColumnWidths(1, 15, 100); // reset to default widths "100"

  in_sheet.appendRow(["Step Name", "Description", "Expected Results", "Notes"]);

  /* because there should at least be 1 step
   * also if row 2 is empty, the jiraMarkup() function will be sad :(
   */
  in_sheet.appendRow(["Step 1", "Click button", "Action occurs", "Remeber to notice this special case..."]);
  in_sheet.appendRow(["VP 1", "", "Verify that action occured", ""]);

  /* resonable sizes for editing */
  in_sheet.autoResizeColumn(1);
  in_sheet.setColumnWidth(2, 300);
  in_sheet.setColumnWidth(3, 300);
  in_sheet.setColumnWidth(4, 300);
}
