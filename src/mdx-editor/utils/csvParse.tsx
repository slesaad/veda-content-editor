import Papa from "papaparse";

function CSVReader(filePath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true, // Crucial for fetching the file from a URL
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (results.meta.fields) {
          resolve(results.meta.fields);
        } else {
          reject(new Error("No fields found in CSV."));
        }
      },
      error: function (error) {
        reject(error);
      },
    });
  });
}

export default CSVReader;

