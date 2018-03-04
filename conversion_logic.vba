Private Sub bt_convert_Click()

'*************** VARIABLE DECLARATIONS ***********************

Dim rowIndex As Integer 'integer pointer for row

rowIndex = 1 'start in row 1 column a

'++++++++++ RANGE FUNCTION VARIABLES
Dim rangeString As String   'string to store range
Dim startIndex As Integer   'starting row
Dim endIndex As Integer     'ending row
Dim tempString As String    'temp storage for values\
Dim startNum As Integer     'first row value
Dim endNum As Integer       'end row value

startIndex = 4  'start on first index of first character
tempString = "" 'empty string

'++++++++++ CONCATENATE FUNCTION VARIABLES
Dim concString As String 'variable to store all cell values
Dim copyString As String 'hold string value
Dim resultString As String 'excepted results value
Dim cellIndex As Integer 'cell index variable
Dim stringIndex As Integer 'string pointer variable

concString = "" 'empty string
copyString = "" 'empty string

'++++++++++ DELETE FUNCTION VARIABLES
Dim delCellIndex As Integer 'index
Dim start As Integer        'start variables

'++++++++++ BARS FUNCTION VARIABLES
Dim iRow As Integer
Dim iCol As Integer
Dim iCount As Integer

iCount = 0
iRow = 1
iCol = 2


'--------------------------- ALGORITHM --------------------
'while there is a valus in colummn
Do While Cells(rowIndex, "A").Value <> vbNullString
    If Cells(rowIndex, "A").MergeCells Then 'if cells are merged
        '--------------- GET RANGE VALUES
        rangeString = Cells(rowIndex, "A").MergeArea.Address
        
        Do While Mid(rangeString, startIndex, 1) <> ":" 'while character in string != ':'
            tempString = tempString + Mid(rangeString, startIndex, 1) 'insert start row chars
            startIndex = startIndex + 1
        Loop
        
        startNum = CInt(tempString)
        
        startIndex = startIndex + 4 'start index for end range variable
        endIndex = Len(rangeString) 'end index for address
        tempString = ""             'empty out string
        
        
        Do While startIndex <= endIndex
            tempString = tempString + Mid(rangeString, startIndex, 1)
            startIndex = startIndex + 1
        Loop
        endNum = CInt(tempString)
        
        '---------------- CONCATENANTE CELLS
        For cellIndex = startNum To endNum
            If cellIndex <> endNum Then 'cellIndex != endNum
                If Cells(cellIndex, "B").Value <> "" Then 'not empty
                    copyString = "" 'empty copy string
                    
                    For stringIndex = 1 To Len(Cells(cellIndex, "B").Value)
                        If Mid(Cells(cellIndex, "B").Value, stringIndex, 1) = "[" Then
                            copyString = copyString + "*" + Mid(Cells(cellIndex, "B").Value, stringIndex, 1) + " "
                        ElseIf Mid(Cells(cellIndex, "B").Value, stringIndex, 1) = "]" Then
                            copyString = copyString + " " + Mid(Cells(cellIndex, "B").Value, stringIndex, 1) + "*"
                        Else
                            copyString = copyString + Mid(Cells(cellIndex, "B").Value, stringIndex, 1)
                        End If
                    Next stringIndex
                    concString = concString + copyString + "\\"
                    Cells(cellIndex, "B") = "" 'delete cell values
                Else
                End If
            Else
                If Cells(cellIndex, "B").Value <> "" Then
                    copyString = ""
                    
                    For stringIndex = 1 To Len(Cells(cellIndex, "B").Value)
                        If Mid(Cells(cellIndex, "B").Value, stringIndex, 1) = "[" Then
                            copyString = copyString + "*" + Mid(Cells(cellIndex, "B").Value, stringIndex, 1) + " "
                        ElseIf Mid(Cells(cellIndex, "B").Value, stringIndex, 1) = "]" Then
                            copyString = copyString + " " + Mid(Cells(cellIndex, "B").Value, stringIndex, 1) + "*"
                        Else
                            copyString = copyString + Mid(Cells(cellIndex, "B").Value, stringIndex, 1)
                        End If
                    Next stringIndex
                    concString = concString + copyString
                    Cells(cellIndex, "B") = "" 'delete cell values
                Else
                End If
            End If
        Next cellIndex
        
        Cells(startNum, "B").Value = concString 'set string to first row of step
        
        'merging results cell
        If Cells(startNum, "C").MergeCells Then 'cell C merged
        
        Else 'if not merged go cell to cell and concatenating
            resultString = ""
            For cellIndex = startNum To endNum
                If Cells(cellIndex, "C").Value <> "" Then 'not empty
                    resultString = resultString + Cells(cellIndex, "C").Value + "\\"
                Else
                
                End If
            Next cellIndex
            Cells(startNum, "C").Value = resultString
        End If
                
        '---------------- UNMERGER CELLS
        Cells(startNum, "A").UnMerge
        Cells(startNum, "C").UnMerge
        
        '---------------- DELETE ROWS
        start = startNum + 1
        
        For delCellIndex = 1 To (endNum - startNum)
            Rows([start]).EntireRow.Delete
        Next delCellIndex
                
    Else '---------- cells are not merged do nothing
        rangeString = ""
        rangeString = Cells(rowIndex, "A").MergeArea.Address
        startIndex = 4
        endIndex = Len(rangeString) 'end index for address
        tempString = ""             'empty out string
        
        Do While startIndex <= endIndex
            tempString = tempString + Mid(rangeString, startIndex, 1)
            startIndex = startIndex + 1
        Loop
        
        startNum = CInt(tempString) ' start row value
        
        copyString = ""
        For stringIndex = 1 To Len(Cells(startNum, "B").Value)
            If Mid(Cells(startNum, "B").Value, stringIndex, 1) = "[" Then
                copyString = copyString + "*" + Mid(Cells(startNum, "B").Value, stringIndex, 1) + " "
            ElseIf Mid(Cells(startNum, "B").Value, stringIndex, 1) = "]" Then
                copyString = copyString + " " + Mid(Cells(startNum, "B").Value, stringIndex, 1) + "*"
            Else
                copyString = copyString + Mid(Cells(startNum, "B").Value, stringIndex, 1)
            End If
        Next stringIndex
        
        Cells(startNum, "B").Value = copyString
                
    End If
    
    rowIndex = rowIndex + 1
    startIndex = 4  'start on first index of first character
    tempString = "" 'empty string
    concString = "" 'emptry string
Loop

Columns("A").EntireColumn.Insert
Columns("C").EntireColumn.Insert
Columns("E").EntireColumn.Insert

Columns("A:G").Interior.ColorIndex = 0

Columns("B").ColumnWidth = 10
Columns("D").ColumnWidth = 40
Columns("F").ColumnWidth = 40
Columns("H").ColumnWidth = 40

Columns("A").ColumnWidth = 5
Columns("C").ColumnWidth = 5
Columns("E").ColumnWidth = 5
Columns("G").ColumnWidth = 5


Do While Cells(iRow, iCol).Value <> ""
    iCount = iCount + 1
    iRow = iRow + 1
Loop

For iRow = 1 To iCount
    copyString = ""
    For stringIndex = 1 To Len(Cells(iRow, "F").Value)
        If Mid(Cells(iRow, "F").Value, stringIndex, 1) = "[" Then
            copyString = copyString + "*" + Mid(Cells(iRow, "F").Value, stringIndex, 1) + " "
        ElseIf Mid(Cells(iRow, "F").Value, stringIndex, 1) = "]" Then
            copyString = copyString + " " + Mid(Cells(iRow, "F").Value, stringIndex, 1) + "*"
        Else
            copyString = copyString + Mid(Cells(iRow, "F").Value, stringIndex, 1)
        End If
    Next stringIndex
    Cells(iRow, "F").Value = copyString
Next iRow

For iCol = 1 To 9 Step 2
    For iRow = 1 To iCount
        Cells(iRow, iCol).Value = "|"
    Next iRow
Next iCol
    
Columns("A:I").VerticalAlignment = xlTop
Columns("A:I").Font.Name = "Times New Roman"
Columns("A:I").Font.Size = 10
Columns("A:I").Font.Bold = False

For iCol = 1 To 9 Step 2
    For iRow = 1 To iCount
        Cells(iRow, iCol).Font.Bold = True
    Next iRow
Next iCol

Columns("A:I").WrapText = True
Cells(1, "H").Value = "Notes"
MsgBox "format complete!"

End Sub

Private Sub bt_reset_Click()
    ActiveSheet.Rows.EntireRow.RowHeight = ActiveSheet.StandardHeight
    ActiveSheet.Columns.EntireColumn.ColumnWidth = ActiveSheet.StandardWidth
    Columns("A:I").Delete
End Sub

