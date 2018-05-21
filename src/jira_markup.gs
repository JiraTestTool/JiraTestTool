/**
 * The actual function to format and apply markup
 */
function jiraMarkup(input_sheet_name, output_sheet_name) {
  if (!input_sheet_name) {
    input_sheet_name = "Input";
  }

  if (!output_sheet_name) {
    output_sheet_name = "Output";
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var in_sheet = ss.getSheetByName(input_sheet_name);
  var values = in_sheet.getDataRange().getValues();
  var out_sheet = ss.getSheetByName(output_sheet_name);

  var result = out_sheet.getDataRange().getValues();
  var columns = in_sheet.getLastColumn();
  var rows = in_sheet.getLastRow();
  var searchRange = out_sheet.getRange(1,1, rows-1, columns-1);

  SpreadsheetApp.getActiveSpreadsheet().toast('Working...', 'Status', 3);

  /* aquire keywords all at once for quick lookup in format loop */
  var b_list = getKeywords(0); // 0 is the index of the column for BOLD
  var i_list = getKeywords(1); // 1 is the index of the column for ITALICS
  var u_list = getKeywords(2); // 2 is the index of the column for UNDERLINE

  /* declare all local variables */
  var i;
  var step;
  var desc;
  var expect;
  var notes;

  var out_values = [];

  /* Clear old sheet */
  out_sheet.clear();

  for (i = 0; i < rows; i++) {
    if (i != 0) {
      /* replace all tabs with spaces
       * helps prevent the quotation marks showing up after copying
       */
      step   = values[i][0].replace(/\t/g," ");
      desc   = values[i][1].replace(/\t/g," ");
      expect = values[i][2].replace(/\t/g," ");
      notes  = values[i][3].replace(/\t/g," ");

      desc   = textFormatting(desc, b_list, i_list, u_list);
      expect = textFormatting(expect, b_list, i_list, u_list);
      notes  = textFormatting(notes, b_list, i_list, u_list);

      /* if `step` contains substring "VP" */
      if (
        step.indexOf("VP") > -1
        || step.indexOf("vp") > -1
        || step.indexOf("vP") > -1
        || step.indexOf("Vp") > -1
      ) {
        step = step.replace("vp", "VP");
        step = step.replace("vP", "VP");
        step = step.replace("Vp", "VP");

        out_values.push(["||", step, "||", desc, "||", expect, "||", notes, "||"]);
      }
      else {
        out_values.push(["|", step, "|", desc, "|", expect, "|", notes, "|"]);
      }
    }
    else {
      out_values.push(["||", "Step Name", "||", "Description", "||", "Expected Results", "||", "Notes", "||"]);
    }
  }

  /* set range of "rows" rows and "9" columns
   * with the values inside "out_values"
   */
  var range = out_sheet.getRange(1,1,rows, 9);
  range.setValues(out_values);

  sheetFormatting(out_sheet);

  /* call prepareForCopy function
   * which will provide a clean sheet to copy into JIRA
   */
  prepareForCopy(output_sheet_name);

  var result = checkForMistakes(output_sheet_name);

  if (result.toString() != "") {
    Browser.msgBox("Mistakes Found",
                   "Please manually verify the following cells: \\n" + result,
                   Browser.Buttons.OK)
  }
}
