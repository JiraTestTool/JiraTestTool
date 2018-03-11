' from https://gist.github.com/DBremen/0ba67c6ec894ee581d98

Sub ConvertToJiraTable()
    Dim workingRange As Range, currCol As Range, currRow As Range
    Dim rowIndex As Long, colIndex As Long
    Dim output As String, cellVal As String, status As String

    'Dim statusHash As Dictionary
    Dim cb As DataObject

    ' set up clipboard
    Set cb = New DataObject

    ' set up hash for "status"
    'Set statusHash = New Dictionary
    'statusHash("Done") = "(/)"
    'statusHash("Not Done") = "(x)"
    'statusHash("WIP") = "(i)"
    'statusHash("Not Required") = "(!)"

    rowIndex = 1
    'output = "||"

    Dim foundBoldStart As Boolean
    foundBoldStart = False
    Dim stringToBold As String
    stringToBold = ""
    Dim currChar As String

    Application.ScreenUpdating = False

    Set workingRange = Range("A1").CurrentRegion
    For Each currRow In workingRange.Rows
        colIndex = 1
        For Each currCol In currRow.Columns

            ' read each char in a range
            For i = 1 To Len(Cells(rowIndex, colIndex).Value)
                If Cells(rowIndex, colIndex).Characters(i, 1).Font.FontStyle = "Bold" Then
                    currChar = Cells(rowIndex, colIndex).Characters(i, 1).Text
                    If foundBoldStart = False Then
                        foundBoldStart = True
                    End If
                    If foundBoldStart = True Then
                        stringToBold = stringToBold & currChar
                    End If
                    'Debug.Print (stringToBold)
                End If
                'Debug.Print (currChar)
            Next i
            If stringToBold <> "" Then
                Debug.Print ("*" & stringToBold & "*")
                foundBoldStart = False ' reset to False until next bold
                stringToBold = ""      ' reset to empty string until next bold
            End If

            'For i = 1 To Len(Range("A1").Value)
            '  If Range("A1").Characters(i, 1).Font.FontStyle = "Bold" Then
            '    If foundBoldStart = False Then
            '        foundBoldStart = True
            '    End If
            '    If foundBoldStart = True Then
            '        stringToBold = stringToBold & Range("A1").Characters(i, 1).Text
            '    End If
            '    Debug.Print (stringToBold)
            '
            '    'Debug.Print ("The " & Range("A1").Characters(i, 1).Text & " character is bold.")
            '  End If
            'Next i


            'replace empty value with space to generate the cell border
            cellVal = currCol.Value
            If (cellVal = "") Then cellVal = " "
            If rowIndex = 1 Then ' if it's the first row do the "||"
                'MsgBox "rowIndex : " & rowIndex & vbCrLf & "colIndex : " & colIndex
                output = output & "||" & cellVal
            Else
                'If colIndex = 1 Then
                    'status = statusHash(cellVal)
                    'If status = "" Then status = " "
                    'output = output & "|" & rowIndex & "|"
                'ElseIf colIndex > 1 Then
                    output = output & "|" & cellVal
                'End If
            End If
            colIndex = colIndex + 1
        Next currCol
        rowIndex = rowIndex + 1
        '====================================================='
        '============fix the end of each row=================='
        '====================================================='
        If rowIndex = 1 Then ' if it's the first row do the "||"
            'MsgBox "rowIndex : " & rowIndex & vbCrLf & "colIndex : " & colIndex
            output = output & " " & "||"
        Else
            output = output & " " & "|"
        End If
        ' put a new line
        output = output & vbCrLf
        '====================================================='

    Next currRow
    cb.SetText output
    cb.PutInClipboard
    MsgBox ("THE FOLLOWING HAS BEEN PUT INTO YOUR CLIPBOARD :" _
            & vbCrLf & vbCrLf & output)
End Sub
