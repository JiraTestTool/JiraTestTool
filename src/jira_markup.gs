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
  var preConSteps = values[0][0]; // Used to store Step Name dynamically if user decides to use Precondition Vs Step

  if (!values[0][0]) {
    console.error(STEP_MISSING_MESSAGE);
    return STEP_MISSING;
  }
  if (!values[0][1]) {
    console.error(DESCRIPTION_MISSING_MESSAGE);
    return DESCRIPTION_MISSING;
  }
  if (!values[0][2]) {
    console.error(EXPECTED_RESULTS_MISSING_MESSAGE);
    return EXPECTED_RESULTS_MISSING;
  }
  if (!values[0][3]) {
    console.error(NOTES_MISSING_MESSAGE);
    return NOTES_MISSING;
  }

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
  var pcnum = 0; /* EC: Defined the precondition number as "0" */
  var stnum = 0; /* EC: Defined the step number as "0" */
  var vpnum = 0; /* EC: Defined the VP number as "0" */

  var out_values = [];

  /* Clear old sheet */
  out_sheet.clear();

  for (i = 0; i < rows; i++) {
    if (i != 0) {
      /* EC: read all values as strings to fix the issue when a number is only entered in a cell */
      /* trim gets rid of leading and trailing whitespaces */
      /* replace all tabs with spaces
       * helps prevent the quotation marks showing up after copying
       */
      /* EC: replaces any quotation marks with double-quotation marks so it doesn't break the code */
      step   = values[i][0].toString().trim().replace(/\t/g," ").replace(/"/g,'""');
      desc   = values[i][1].toString().trim().replace(/\t/g," ").replace(/"/g,'""');
      expect = values[i][2].toString().trim().replace(/\t/g," ").replace(/"/g,'""');
      notes  = values[i][3].toString().trim().replace(/\t/g," ").replace(/"/g,'""');

      /* apply markup characters for bold (b_list) italics (i_list) and underline (u_list) words. */
      /* the single-quote at the front tells Google Sheets to
       * parse cell as plain-text rather than formula */
      desc   = "'" + textFormatting(desc, b_list, i_list, u_list);
      expect = "'" + textFormatting(expect, b_list, i_list, u_list);
      notes  = "'" + textFormatting(notes, b_list, i_list, u_list);

      /* if `step` contains substring "VP" */
      step = step.replace(/vp/i, "VP"); /* EC: replaces any "vp"(case insensitive) with "VP" in any `step` */

      if (
        step.indexOf("VP") > -1  /* EC: eliminated unneeded or statements due to previous VP replacement code */
      ) {
        vpnum = vpnum + 1; /* EC: increased VP number by 1 */
        step = "VP " + vpnum; /* require standard naming of step name for VP */
        out_values.push(["||", step, "||", desc, "||", expect, "||", notes, "||"]);
      }
      else {
        step = step.replace(/pc/i, "Precondition");
        step = step.replace(/precondition/i, "Precondition");
        step = step.replace(/step/i, "Step");
        step = step.replace(/quote/i, "Quote");
        if (step.indexOf("Step") > -1) {
          stnum = stnum + 1; /* If `step` contains "Step", increase Step number by 1 */
          step = "Step " + stnum; /* require standard naming of step name for Step */
        }
        else if (step.indexOf("Precondition") > -1) {
          pcnum = pcnum + 1; /* If `step` contains "Precondition", increase Precondition number by 1 */
          step = "Precondition " + pcnum; /* require standard naming of step name for Step */
        }
        else if (step.indexOf("Quote") > -1) {
          /* If `step` contains "Quote", then Step number is same as previous */
          desc = desc.slice(1); /* remove the single-quote at the front because it is not useful when Quote gets inserted into a previous row */
          desc = "\n" + " {quote}" + desc + "{quote}"; /* surround description with quote tags */
          out_values[out_values.length-1][3] += desc; /* append description to last row (index 3 of out_values has description)*/
          continue; /* continue to avoid appending the Quote row to the out_values */
        }
        /* else leave it alone? */
        out_values.push(["|", step, "|", desc, "|", expect, "|", notes, "|"]);
      }
    }
    else {
      out_values.push(["||", preConSteps, "||", "Description", "||", "Expected Results", "||", "Notes", "||"]);
    }
  }

  /* set range of "out_values.length" rows and "9" columns
   * with the values inside "out_values"
   */
  var range = out_sheet.getRange(1,1,out_values.length, 9);
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
