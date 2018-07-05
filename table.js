
var data = [
  ["Step", "Description", "Expected", "Notes"],
  ["Step 1", "do stuff", "expect this", "remember this important thing"],
  ["Step 2", "do stuff", "expect this", ""],
  ["Step 3", "do stuff", "expect this", ""],
  [,,,],
  [,,,],
  [,,,],
  [,,,],
  [,,,]
];

var container = document.getElementById('sheet');
var searchFiled = document.getElementById('search_field');
var hot = new Handsontable(container, {
  data: data,
  width: 800,
  rowHeaders: true,
  colHeaders: [
     'Step',
     'Description',
     'Expected',
     'Notes',
  ],
  colWidths: [60, 200, 200, 200],
  /* true by default */
  allowInsertRow: true, /* even without contextMenu, can paste to expand spreadsheet */
  allowRemoveRow: true,
  /* false by default */
  search: true,
  contextMenu: true,
  mergeCells: true,
  manualRowResize: true,
  manualColumnResize: true,
  wordWrap: true,
  //manualRowMove: true,
  //manualColumnMove: true,
  /* a way to enforce 4 columns Step/Desc/Expect/Notes */
  allowInsertColumn: false,
  allowRemoveColumn: false
});

Handsontable.dom.addEvent(searchFiled, 'keyup', function (event) {
  var search = hot.getPlugin('search');
  var queryResult = search.query(this.value);

  console.log(queryResult);
  hot.render();
});
