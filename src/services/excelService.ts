import * as XLSX from "xlsx";

export async function loadExcelData() {
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
    workbook.Sheets["akses_nas"];

  const data =
    XLSX.utils.sheet_to_json(sheet);

  return data;
}