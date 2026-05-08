export const escapeCsvValue = (value) => {
  const stringValue = value == null ? "" : String(value);
  const escapedValue = stringValue.replace(/"/g, '""');

  if (/[",\r\n]/.test(stringValue)) {
    return `"${escapedValue}"`;
  }

  return escapedValue;
};

export const buildCsvContent = (rows) => {
  if (!rows || rows.length === 0) {
    return "";
  }

  const headers = Object.keys(rows[0]);
  const headerLine = headers.join(",");
  const dataLines = rows.map((row) =>
    headers.map((header) => escapeCsvValue(row[header])).join(","),
  );

  return [headerLine, ...dataLines].join("\n");
};

export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "orange";
    case "processing":
      return "blue";
    case "completed":
      return "green";
    default:
      return "default";
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "待處理";
    case "processing":
      return "處理中";
    case "completed":
      return "已完成";
    default:
      return status;
  }
};
