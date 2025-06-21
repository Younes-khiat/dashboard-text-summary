document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const previewContent = document.getElementById('previewContent');
    const fileInput = document.getElementById('pdfFile');
   
    
    generateBtn.addEventListener('click', async function () {
        const file = fileInput.files[0];
        if (!file) {
            previewContent.innerHTML = '<p class="error">Please select a PDF file first.</p>';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        previewContent.innerHTML = '<p>Uploading and processing PDF...</p>';

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData
            });

                const data = await response.json();

            if (!response.ok) {
        // Show error from server if available
        previewContent.innerHTML = `<p class="error">${data.error || 'Failed to upload PDF'}</p>`;
        return;
    }

    // Show success message
    previewContent.innerHTML = `<h4>Extracted Text:</h4><p>${data.message}</p>`;
} catch (error) {
    previewContent.innerHTML = `<h4>Extracted Text:::::::::::</h4><p class="error">${error.message}</p>`;
}
    });
});