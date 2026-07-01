import * as XLSX from "xlsx";

export async function loadExcelData(
  sheetName: string
) {
  const response = await fetch(
    "/data/data-airminum.xlsx"
  );

  const arrayBuffer =
    await response.arrayBuffer();

  const workbook = XLSX.read(
    arrayBuffer,
    {
      type: "array",
    }
  );

  const sheet =
    workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(
      `Sheet "${sheetName}" tidak ditemukan`
    );
  }

  return XLSX.utils.sheet_to_json(sheet);
}