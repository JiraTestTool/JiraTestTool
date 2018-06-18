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
  var pcnum = 0; /* EC: Defined the precondition number as "0" */
  var stnum = 0; /* EC: Defined the step number as "0" */
  var vpnum = 0; /* EC: Defined the VP number as "0" */

  /* Clear old sheet */
  out_sheet.clear();

  for (i = 0; i < rows; i++) {
    if (i != 0) {
      /* EC: read all values as strings to fix the issue when a number is only entered in a cell */
      step   = values[i][0].toString();
      desc   = values[i][1].toString();
      expect = values[i][2].toString();
      notes  = values[i][3].toString();

      /* replace all tabs with spaces
       * helps prevent the quotation marks showing up after copying
       */
      step   = step.replace(/\t/g," ");
      desc   = desc.replace(/\t/g," ");
      expect = expect.replace(/\t/g," ");
      notes  = notes.replace(/\t/g," ");

      /* EC: replaces any quotation marks with double-quotation marks so it doesn't break the code */
      step   = step.replace(/"/g,'""');
      desc   = desc.replace(/"/g,'""');
      expect = expect.replace(/"/g,'""');
      notes  = notes.replace(/"/g,'""');

      /* EC: replaces any double back-slashes (\\) with a new line break since JIRA interprets double back-slashes (\\) as a new line break */
      step   = step.replace(/\\\\/g,"\r\n");
      desc   = desc.replace(/\\\\/g,"\r\n");
      expect = expect.replace(/\\\\/g,"\r\n");
      notes  = notes.replace(/\\\\/g,"\r\n");

      desc   = textFormatting(desc, b_list, i_list, u_list);
      expect = textFormatting(expect, b_list, i_list, u_list);
      notes  = textFormatting(notes, b_list, i_list, u_list);

      /* if `step` contains substring "VP" */
      step = step.replace(/vp/i, "VP"); /* EC: replaces any "vp"(case insensitive) with "VP" in any `step` */

      if (
        step.indexOf("VP") > -1  /* EC: eliminated unneeded or statements due to previous VP replacement code */
      ) {
        vpnum = vpnum + 1; /* EC: increased VP number by 1 */
        step = (step === "VP") ? step + " " + vpnum : step; /* EC: Test to see if `step` is equal to "VP". If it is, then replace it with VP # else just keep `step` as it is */
        out_sheet.appendRow(["||", step, "||", desc, "||", expect, "||", notes, "||"]);
      }
      else {
        step = step.replace(/pc/i, "Precondition");
        step = step.replace(/precondition/i, "Precondition");
        step = step.replace(/step/i, "Step");
        if (step === "Step") stnum = stnum + 1; /* EC: If `step` is equal to "Step", increased Step number by 1 */
        if (step === "Precondition") pcnum = pcnum + 1; /* EC: If `step` is equal to "Precondition", increased Precondition number by 1 */
        step = (step === "Step") ? step + " " + stnum : step; /* EC: Test to see if `step` is equal to "Step". If it is, then replace it with Step # else just keep `step` as it is */
        step = (step === "Precondition") ? step + " " + pcnum : step; /* EC: Test to see if `step` is equal to "Precondition". If it is, then replace it with Precondition # else just keep `step` as it is */
        out_sheet.appendRow(["|", step, "|", desc, "|", expect, "|", notes, "|"]);
      }
    }
    else {
      out_sheet.appendRow(["||", "Step Name", "||", "Description", "||", "Expected Results", "||", "Notes", "||"]);
    }
  }

  sheetFormatting(out_sheet);

  /* call prepare for Copy function
   * which will provide a clean sheet to copy into JIRA
   */
  prepareForCopy("Output");
}
