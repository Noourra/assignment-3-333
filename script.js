const apiUrl = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error fetching data: ${response.status}');
    }
    
    const data = await response.json();
    console.log("API Response: ", data);
    if (data.records && Array.isArray(data.records)){

    
    populateTable(data.records);
    } else {
      console.error("Invalid data structure: 'records' is missing or not an array.", data );
    }
  } catch (error) {
    console.error(error);
  }
}
function populateTable(records) {
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML='';
  records.forEach(record => {
    const fields=record.fields || {};
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.fields.nationality || 'N/A'}</td>
      <td>${record.fields.colleges || 'N/A'}</td>
      <td>${record.fields.the_programs || 'N/A'}</td>
      <td>${record.fields.student_count || 'N/A'}</td>
    `;
    tableBody.appendChild(row);
  });
}
fetchData();
