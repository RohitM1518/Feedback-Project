export function downloadCSV(data) {
    // Extract headers from the first object in the array
    const headers = Object.keys(data[0]);

    // Convert array of objects to CSV format
    const csv = [
        headers.join(','), // Header row
        ...data.map(item => headers.map(header => item[header]).join(','))
    ].join('\n');
    
    // Create a Blob containing the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'feedback.csv';

    // Append the link to the body and trigger the click event
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
}


