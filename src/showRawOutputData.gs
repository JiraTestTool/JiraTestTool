function showRawOutputData() {
  var allValues = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  var html = HtmlService.createHtmlOutputFromFile('Page').setWidth(400).setHeight(300);
  
  var outputString = "";
  
  for (var i=0; i<allValues.length; i++) {
    for (var j=0; j<allValues[i].length; j++) {
      outputString += allValues[i][j] + ' ';
    }
    outputString += '<br>';
  }
  
  html.setContent(outputString);
  SpreadsheetApp.getUi().showModalDialog(html, 'Modal dialog');
}
