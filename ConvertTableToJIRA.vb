' from https://gist.github.com/DBremen/0ba67c6ec894ee581d98
' author DBremen

Sub ConvertToJiraTable()
    Dim workingRange As Range, currCol As Range, currRow As Range
    Dim rowIndex As Long, colIndex As Long
    Dim output As String, cellVal As String, status As String
    Dim statusHash As Dictionary
    Dim cb As DataObject
    Set cb = New DataObject
    Set statusHash = New Dictionary
    statusHash("Done") = "(/)"
    statusHash("Not Done") = "(x)"
    statusHash("WIP") = "(i)"
    statusHash("Not Required") = "(!)"
    rowIndex = 1
    output = "||"
    Application.ScreenUpdating = False
    Set workingRange = Range("A1").CurrentRegion
    For Each currRow In workingRange.Rows
        colIndex = 1
        For Each currCol In currRow.Columns
            'replace empty value with space to generate the cell border
            cellVal = currCol.Value
            If (cellVal = "") Then cellVal = " "
            If rowIndex = 1 Then
                output = output & cellVal & "||"
            Else
                If colIndex = 1 Then
                    status = statusHash(cellVal)
                    If status = "" Then status = " "
                    output = output & "|" & status & "|"
                ElseIf colIndex > 1 Then
                    output = output & cellVal & "|"
                End If
            End If
            colIndex = colIndex + 1
        Next currCol
        rowIndex = rowIndex + 1
        output = output & vbCrLf
    Next currRow
    cb.SetText output
    cb.PutInClipboard
End Sub
