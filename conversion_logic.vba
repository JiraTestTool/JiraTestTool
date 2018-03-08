'Authors: Jon Devera, Michael Fekadu

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

            'while character in string != ':'
            Do While Mid(rangeString, startIndex, 1) <> ":"
                'insert start row chars
                tempString = tempString + Mid(rangeString, startIndex, 1)
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
                ' B is the description section for now'
                    If Cells(cellIndex, "B").Value <> "" Then 'not empty
                        copyString = "" 'empty copy string

                        ' if you see the [ 
                        ' then surround the [] with ** to get bold
                        For stringIndex = 1 To Len(Cells(cellIndex, "B").Value)
                            If Mid(Cells(cellIndex, "B").Value, _
                                  stringIndex, 1) = "[" Then
                                  ' ADD THE "BOLD" JIRA MARKUP'
                                copyString = copyString + "*" _
                                          + Mid(Cells(cellIndex, "B").Value, _
                                                stringIndex, 1) _
                                          + " "
                            ElseIf Mid(Cells(cellIndex, "B").Value, _
                                        stringIndex, 1) = "]" Then
                                copyString = copyString _
                                          + " " _
                                          + Mid(Cells(cellIndex, "B").Value, _
                                                stringIndex, 1) _
                                          + "*"
                            Else
                                copyString = copyString _
                                          + Mid(Cells(cellIndex, "B").Value, _
                                                stringIndex, 1)
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
                            If Mid(Cells(cellIndex, "B").Value, _
                                          stringIndex, 1) = "[" Then
                                copyString = copyString _
                                          + "*" _
                                          + Mid(Cells(cellIndex, "B").Value, _
                                                stringIndex, 1) _
                                          + " "
                            ElseIf Mid(Cells(cellIndex, "B").Value, _
                                        stringIndex, 1) = "]" Then
                                copyString = copyString _
                                          + " " _
                                          + Mid(Cells(cellIndex, "B").Value, _
                                                stringIndex, 1) _
                                          + "*"
                            Else
                                copyString = copyString _
                                          + Mid(Cells(cellIndex, "B").Value, _
                                                stringIndex, 1)
                            End If
                        Next stringIndex
                        concString = concString + copyString
                        Cells(cellIndex, "B") = "" 'delete cell values
                    Else
                    End If
                End If
            Next cellIndex

            'set string to first row of step
            Cells(startNum, "B").Value = concString

            'merging results cell
            If Cells(startNum, "C").MergeCells Then 'cell C merged

            Else 'if not merged go cell to cell and concatenating
                resultString = ""
                For cellIndex = startNum To endNum
                    If Cells(cellIndex, "C").Value <> "" Then 'not empty
                        resultString = resultString _
                                    + Cells(cellIndex, "C").Value _
                                    + "\\"
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
                    copyString = copyString _
                              + "*" _
                              + Mid(Cells(startNum, "B").Value, _
                                    stringIndex, 1) _
                              + " "
                ElseIf Mid(Cells(startNum, "B").Value, _
                          stringIndex, 1) = "]" Then
                    copyString = copyString _
                              + " " _
                              + Mid(Cells(startNum, "B").Value, _
                                    stringIndex, 1) _
                              + "*"
                Else
                    copyString = copyString _
                              + Mid(Cells(startNum, "B").Value, _
                                    stringIndex, 1)
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


    ' iCount is the row that has the last step

    Do While Cells(iRow, iCol).Value <> ""
        iCount = iCount + 1
        iRow = iRow + 1
    Loop

    ' same logic as the bracket bold markup stuff above
    For iRow = 1 To iCount
        copyString = ""
        For stringIndex = 1 To Len(Cells(iRow, "F").Value)
            If Mid(Cells(iRow, "F").Value, stringIndex, 1) = "[" Then
                copyString = copyString _
                          + "*" _
                          + Mid(Cells(iRow, "F").Value, _
                                stringIndex, 1) _
                          + " "
            ElseIf Mid(Cells(iRow, "F").Value, stringIndex, 1) = "]" Then
                copyString = copyString _
                          + " " _
                          + Mid(Cells(iRow, "F").Value, _
                                stringIndex, 1) _
                          + "*"
            Else
                copyString = copyString _
                          + Mid(Cells(iRow, "F").Value, _
                                stringIndex, 1)
            End If
        Next stringIndex
        Cells(iRow, "F").Value = copyString
    Next iRow

    ' put the bar delimiters '
    For iCol = 1 To 9 Step 2
        For iRow = 1 To iCount
            Cells(iRow, iCol).Value = "|"
        Next iRow
    Next iCol

    Columns("A:I").VerticalAlignment = xlTop
    Columns("A:I").Font.Name = "Times New Roman"
    Columns("A:I").Font.Size = 10
    Columns("A:I").Font.Bold = True

    ' bold the header row'
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
