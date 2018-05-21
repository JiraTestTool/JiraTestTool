/**
 * This function sets up the Input/Output/Keywords sheets
 * So that the add-on version of JTT can work without a template sheet.
 */
function setupSheets() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  /* define sheet names */
  var in_name  = "Input";
  var out_name = "Output";
  var key_name = "Keywords";

  /* exit early if all sheets exist */
  if (
    ss.getSheetByName(in_name)
    && ss.getSheetByName(out_name)
    && ss.getSheetByName(key_name)
  ) {
    return true;
  }

  /* create sheets */
  var in_sheet  = createAndPositionSheet(in_name, 1);
  var out_sheet = createAndPositionSheet(out_name, 2);
  var key_sheet = createAndPositionSheet(key_name, 3);

  /* if createAndPositionSheet() made a brand new key_sheet
   * then the cell A1 will have the string key_name
   */
  if ( key_sheet.getRange("A1").getValue() == key_name ) {
    /* set up "Keywords" contents */
    ss.getSheetByName(key_name).getRange("A1:F18").setBackgrounds(KEYWORDS_BACKGROUNDS);
    ss.getSheetByName(key_name).getRange("A1:F18").setFontColors(KEYWORDS_FONT_COLORS);
    ss.getSheetByName(key_name).getRange("A1:F18").setFontLines(KEYWORDS_FONT_LINES);
    ss.getSheetByName(key_name).getRange("A1:F18").setFontSizes(KEYWORDS_FONTSIZES);
    ss.getSheetByName(key_name).getRange("A1:F18").setFontStyles(KEYWORDS_FONT_STYLES);
    ss.getSheetByName(key_name).getRange("A1:F18").setFontWeights(KEYWORDS_FONT_WEIGHTS);
    ss.getSheetByName(key_name).getRange("A1:F18").setValues(KEYWORDS_VALUES);
    ss.getSheetByName(key_name).getRange("A1:F18").setWraps(KEYWORDS_WRAPS);

    /* set up "Keywords" column widths */
    ss.getSheetByName(key_name).setColumnWidth(1, 105);
    ss.getSheetByName(key_name).setColumnWidth(2, 125);
    ss.getSheetByName(key_name).setColumnWidth(3, 180);
    ss.getSheetByName(key_name).setColumnWidth(4, 10);
    ss.getSheetByName(key_name).setColumnWidth(5, 740);
    ss.getSheetByName(key_name).setColumnWidth(6, 45);
  }

  /* set up "Input" contents */
  resetSheet(in_name);

  /* set up "Output" contents */
  jiraMarkup(in_name, out_name);

  return true;
}

/* creates sheet_name,
 * postions it,
 * and returns it as the active sheet
 */
function createAndPositionSheet(sheet_name, position){
  var ss           = SpreadsheetApp.getActiveSpreadsheet();
  var active_sheet = ss.getActiveSheet();
  var sheet        = ss.getSheetByName(sheet_name);

  if(sheet == null) {
    if (active_sheet.getLastRow() == 0) {
      /* if sheet_name not exist and curr sheet empty */
      active_sheet.setName(sheet_name);
      active_sheet.activate();
      ss.moveActiveSheet(position);
    }
    else {
      /* otherwise create sheet_name at position -1 becaause 0 == first */
      ss.insertSheet(sheet_name, position-1).activate();
    }
  }
  else {
    sheet.activate();
    ss.moveActiveSheet(position);
  }

  /* to allow this function to get called repeatedly
   * make sure next call of createAndPositionSheet()
   * does not find an empty sheet
   */
  if (ss.getActiveSheet().getLastRow() == 0) {
    ss.getActiveSheet().getCurrentCell().setValue(sheet_name);
  }

  return ss.getActiveSheet();
}
