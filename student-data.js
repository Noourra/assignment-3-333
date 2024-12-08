const url = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

// Fetch data from the API
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Check if the data exists and contains results
        if (data && data.results) {
            
             // Create a table element to display the data
            const table = document.createElement('table');
            table.classList.add('table', 'table-bordered'); 

            // Create the table header with column names
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>The Programs</th>
                    <th>Nationality</th>
                    <th>Colleges</th>
                    <th>Number of students</th>
                </tr>
            `;
            table.appendChild(thead);
           
            // Create the table body to hold the data rows
            const tbody = document.createElement('tbody');

            // Loop through each record in the data and create a row
            data.results.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.year ?? 'N/A'}</td>
                    <td>${student.semester ?? 'N/A'}</td>
                    <td>${student.the_programs ?? 'N/A'}</td>
                    <td>${student.nationality ?? 'N/A'}</td>
                    <td>${student.colleges ?? 'N/A'}</td>
                    <td>${student.number_of_students ?? 'N/A'}</td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            // Find the container in the DOM and append the constructed table to it
                        const dataContainer = document.getElementById('data-container');
            dataContainer.appendChild(table);
        } else {
             // Alert the user if the data or results are not found
                       alert("Something went wrong, Output (data) not found");
        }
    })
    .catch(error => {
             // Log the error to the console and alert the user
               console.error("Error fetching data:", error);
        alert("An error occurred while fetching the data.");
    });
