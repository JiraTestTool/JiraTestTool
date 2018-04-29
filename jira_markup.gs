
/**
 * The actual function to format and apply markup
 */
function jiraMarkup(input_sheet_name) {
  if (!input_sheet_name) {
    input_sheet_name = "Input";
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var in_sheet = ss.getSheetByName(input_sheet_name);
  var values = in_sheet.getDataRange().getValues();
  var out_sheet = ss.getSheetByName("Output");
  var cell = out_sheet.getRange("D1:D100"); //To set word wrap

  var result = out_sheet.getDataRange().getValues();
  var columns = in_sheet.getLastColumn();
  var rows=in_sheet.getLastRow();
  var searchRange = out_sheet.getRange(1,1, rows-1, columns-1);

  SpreadsheetApp.getActiveSpreadsheet().toast('Working...', 'Status', 3);

  /* aquire keywords all at once for quick lookup in format loop */
  var b_list = getKeywords(0); // 0 is the index of the column for BOLD
  var i_list = getKeywords(1); // 1 is the index of the column for ITALICS
  var u_list = getKeywords(2); // 2 is the index of the column for UNDERLINE

  var i, j; // declaring local vars prevents getting stuck in loop on textFormatting function call

  //Clear old sheet
  out_sheet.clear();

  for (i = 0; i < rows; i++) {
    var step;
    var desc;
    var expect;
    var notes;

    if (i != 0) {
      for (j = 0; j < columns; j++) {
        /* replace all tabs with spaces
         * helps prevent the quotation marks showing up after copying
         */
        values[i][j] = values[i][j].replace(/\t/g," ");;

        switch (j) {
          case 0:
            step = values[i][j];
            break;
          case 1:
            desc = textFormatting(values[i][j], b_list, i_list, u_list);
            /* the single-quote at the front tells Google Sheets to parse cell as plain-text rather than formula */
            desc = "'" + desc;
            //var descWithQuotesEscaped = desc.replace(/"/g, "\"&CHAR(34)&\""); // escape the quotation mark
            //desc = "=\"" + descWithQuotesEscaped + "\"";
            break;
          case 2:
            expect = textFormatting(values[i][j], b_list, i_list, u_list);
            expect = "'" + expect;
            //var expectWithQuotesEscaped = expect.replace(/"/g, "\"&CHAR(34)&\""); // escape the quotation mark
            //expect = "=\"" + expectWithQuotesEscaped + "\"";
            break;
          case 3:
            notes = textFormatting(values[i][j], b_list, i_list, u_list);
            notes = "'" + notes;
            //var notesWithQuotesEscaped = notes.replace(/"/g, "\"&CHAR(34)&\""); // escape the quotation mark
            //notes = "=\"" + notesWithQuotesEscaped + "\"";
            break;
          default:
            break;
        }
      }
      /* if `step` contains substring "VP" */
      if (step.indexOf("VP") > -1 || step.indexOf("vp") > -1 || step.indexOf("Vp") > -1) {
        step = step.replace("vp", "VP");
        step = step.replace("Vp", "VP");
        out_sheet.appendRow(["||", step, "||", desc, "||", expect, "||", notes, "||"]);
      }
      else {
        out_sheet.appendRow(["|", step, "|", desc, "|", expect, "|", notes, "|"]);
      }
    }
    else {
      out_sheet.appendRow(["||", "Step Name", "||", "Description", "||", "Expected Results", "||", "Notes", "||"]);
    }
  }

  /* Finally resize the delimiter columns to a width of 20 pixels */
  out_sheet.setColumnWidth(1, 20); // 1 refers to the first column
  out_sheet.setColumnWidth(3, 20); // then further delimiters are on odd columns
  out_sheet.setColumnWidth(5, 20);
  out_sheet.setColumnWidth(7, 20);
  out_sheet.setColumnWidth(9, 20);

  /* set standard widths for non-delimeter columns
   * these are reasonable widths for viewing while page Zoom = 100%
   */
  out_sheet.setColumnWidth(2, 100); // 100 pixels for *Step Name* column
  out_sheet.setColumnWidth(4, 300); // 300 pixels for *Description* column
  out_sheet.setColumnWidth(6, 200); // 200 pixels for *Expected Results* column
  out_sheet.setColumnWidth(8, 150); // 150 pixels for *Notes* column

  cell.setWrap(true); //Word Wrap Description
  cell = out_sheet.getRange("B1:B100");
  cell.setWrap(true);
  cell = out_sheet.getRange("F1:F100");
  cell.setWrap(true);
  cell = out_sheet.getRange("H1:H100");
  cell.setWrap(true);

  /* call prepare for Copy function
   * which will provide a clean sheet to copy into JIRA
   */
  prepareForCopy("Output");
}
