/**
 * Converts a JSON array to a CSV string.
 *
 * @template T - The type of objects in the JSON array.
 * @param {T[]} jsonArray - The array of JSON objects to convert.
 * @param {(keyof T)[]} headers - The list of (escaped) headers to include in the CSV, corresponding to the keys in the JSON objects.
 * @returns {string} The resulting CSV string.
 */
export function jsonToCsv(jsonArray: { [key: string] : string }[], headers: string[]): string {
  // Create header row
  const csvHeader = headers.join(",") + "\n";

  // Helper function to escape special characters
  const escapeValue = (value: any): string => {
    if (typeof value !== "string") return value;

    // Escape double quotes by doubling them
    const escaped = value.replace(/"/g, '""');

    // Wrap in double quotes if there are commas, double quotes, or newlines
    if (
      escaped.includes(",") ||
      escaped.includes('"') ||
      escaped.includes("\n")
    ) {
      return `"${escaped}"`;
    }

    return escaped;
  };

  // Create data rows
  const csvRows = jsonArray
    .map((obj) => {
      return headers.map((header) => escapeValue(obj[header])).join(",");
    })
    .join("\n");

  return csvHeader + csvRows;
}

/**
 * Triggers a download of a CSV file with the given content and filename.
 *
 * @param {string} csvContent - The content of the CSV file.
 * @param {string} filename - The name of the file to be downloaded.
 * @returns {void}
 */
export function downloadCsv(csvContent: string, filename: string): void {
  // Create a Blob from the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a link to trigger the download
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);

  // Append the link to the DOM, trigger the click, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
