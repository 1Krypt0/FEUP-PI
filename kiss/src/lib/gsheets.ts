/**
 * Fetches the google sheet to get the data in the sheets it contains
 * @returns the data present in the spreadsheet
 */
async function getSpreadsheetSheets<T> (url: string): Promise<T> {
  const spreadsheetData = fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching the spreadsheet')
      }
      return response.json() as Promise<{ sheets: T }>
    })
    .then(data => {
      return data.sheets
    })

  return spreadsheetData
}

/**
 * Retrieves the content from a sheet
 * @returns all the rows of data in a sheet
 */
async function getSheetContent<T> (url: string): Promise<T> {
  const sheetContent = fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching the spreadsheet')
      }
      return response.json() as Promise<{ values: T }>
    })
    .then(data => {
      return data.values
    })
  return sheetContent
}

/**
 * Gets the names of the sheets
 * @returns a list with the names of the different sheets
 */
function parseSheetTitles (sheets: Array<{ properties: { title: string}}>): string[] {
  const titles: string[] = []
  sheets.forEach((sheet: { properties: { title: string}}) => {
    titles.push(sheet.properties.title)
  })
  return titles
}

/**
 * Parses the data to assemble the object, separating the headers from the values.
 * @returns the object that represents the data in the sheet
 */
function separateHeaders (rows: Array<Array<string>>): Array<Record<string, string>> {
  const headers = rows.shift() || []
  const res: Array<Record<string, string>> = []
  rows.forEach(function (row: Array<string>) {
    const rowData: Record<string, string> = {}
    row.forEach(function (item: string, index: number) {
      const idx: string = headers[index]
      rowData[idx] = item
    })
    res.push(rowData)
  })
  return res
}

/**
 * Retrieves all the data in a spreadsheet and parses it
 * @returns an object with all the data in a spreadsheet
 */
export async function retrieveDataFromSpreadsheet (spreadsheetId: string, key: string) : Promise<Record<string, Record<string, string>[]>[]> {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '?key=' + key
  const data: Array<{ properties: { title: string}}> = await getSpreadsheetSheets(url)
  const titles: string[] = parseSheetTitles(data)
  const sheets: Array<Record<string, Array<Record<string, string>>>> = []

  for (const title of titles) {
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + title + '?key=' + key
    const content: Array<Array<string>> = await getSheetContent(url)
    const headers = separateHeaders(content)
    const sheet : Record<string, Array<Record<string, string>>> = {}
    sheet[title] = headers
    sheets.push(sheet)
  }
  return sheets
}

/**
 * Retrieves all the data in a sheet and parses it
 * @returns an object with all the data in a sheet
 */
export async function retrievePageData (title: string, spreadsheetId: string, key: string) : Promise<Record<string, Record<string, string>[]>> {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + title + '?key=' + key
  const sheet : Record<string, Array<Record<string, string>>> = {}
  const content: Array<Array<string>> = await getSheetContent(url)
  const headers = separateHeaders(content)
  sheet[title] = headers
  return sheet
}
