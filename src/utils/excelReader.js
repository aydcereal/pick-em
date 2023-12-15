const XLSX = require("xlsx");

function readExcel() {
  // Read the Excel file
  const workbook = XLSX.readFile("./spreadsheets/week 15.xlsx");

  // Get the first sheet
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert the sheet to JSON
  let data = XLSX.utils.sheet_to_json(sheet);

  // Map over the data and transform it
  data = data.map((item) => ({
    playerName: item.playerName,
    selections: item.selections,
    tiebreakValue: item.tiebreakValue,
    poolKey: item.poolKey,
    userId: item.userId,
    week: parseInt(item.week),
  }));

  console.log(data);
}

module.exports = readExcel;
