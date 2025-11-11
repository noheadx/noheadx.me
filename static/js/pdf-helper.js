/**
 * Helper functions for using jsPDF in blog posts
 *
 * Example usage in your markdown/HTML:
 *
 * <button onclick="generateSimplePDF()">Download as PDF</button>
 *
 * Or create your own custom function:
 *
 * <script>
 * function myCustomPDF() {
 *   const { jsPDF } = window.jspdf;
 *   const doc = new jsPDF();
 *
 *   doc.text("Hello from my post!", 10, 10);
 *   doc.save("my-document.pdf");
 * }
 * </script>
 * <button onclick="myCustomPDF()">Generate PDF</button>
 */

/**
 * Sanitize filename to prevent directory traversal and other issues
 */
function sanitizeFilename(filename) {
    return filename
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric except spaces and hyphens
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/-+/g, '-')           // Replace multiple hyphens with single
        .replace(/^-+|-+$/g, '')       // Trim hyphens from start/end
        .substring(0, 200) || 'blog-post'; // Limit length and provide fallback
}

/**
 * Generate a simple PDF of the current post content using html2canvas
 */
async function generateSimplePDF(clickEvent) {
    // Store reference to the button that was clicked
    const button = clickEvent?.target || clickEvent?.currentTarget;
    const originalText = button?.innerText;

    try {
        const { jsPDF } = window.jspdf;

        // Get elements
        const title = document.querySelector('.post-title h1')?.innerText || 'Blog Post';
        const postContainer = document.querySelector('.container.post');

        if (!postContainer) {
            alert('Could not find post content');
            return;
        }

        // Show loading indicator
        if (button) {
            button.innerText = 'Generating PDF...';
            button.disabled = true;
        }

        // Create a clone of the post for rendering
        const clone = postContainer.cloneNode(true);

        // Remove any script tags from the clone for security
        const scripts = clone.querySelectorAll('script');
        scripts.forEach(script => script.remove());

        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        clone.style.width = '800px';
        clone.style.backgroundColor = 'white';
        clone.style.padding = '40px';
        document.body.appendChild(clone);

        // Render to canvas using html2canvas
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        // Remove clone immediately to free memory
        document.body.removeChild(clone);

        // Check canvas size to prevent memory issues
        const maxCanvasSize = 10000 * 10000; // 100 megapixels max
        if (canvas.width * canvas.height > maxCanvasSize) {
            throw new Error('Content is too large to convert to PDF. Please contact the site administrator.');
        }

        // Create PDF with margins
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const marginTop = 15; // Top margin in mm
        const marginBottom = 15; // Bottom margin in mm
        const marginLeft = 10; // Left margin in mm
        const marginRight = 10; // Right margin in mm

        const contentWidth = pageWidth - marginLeft - marginRight;
        const contentHeight = pageHeight - marginTop - marginBottom;

        // Calculate scaling
        const pxToMm = contentWidth / canvas.width;
        const scaledHeight = canvas.height * pxToMm;

        // Split content across pages
        let yOffset = 0;
        let pageNum = 0;
        const maxPages = 100; // Prevent infinite loops

        while (yOffset < scaledHeight && pageNum < maxPages) {
            if (pageNum > 0) {
                doc.addPage();
            }

            // Calculate what portion of the image to show on this page
            const sourceY = yOffset / pxToMm; // Convert back to pixels
            const sourceHeight = Math.min(contentHeight / pxToMm, canvas.height - sourceY);
            const destHeight = sourceHeight * pxToMm;

            // Create a temporary canvas for this page's content
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = sourceHeight;
            const pageCtx = pageCanvas.getContext('2d');

            // Copy the relevant portion of the original canvas
            pageCtx.drawImage(
                canvas,
                0, sourceY, canvas.width, sourceHeight,
                0, 0, canvas.width, sourceHeight
            );

            // Add this portion to the PDF
            const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
            doc.addImage(pageImgData, 'JPEG', marginLeft, marginTop, contentWidth, destHeight);

            // Clean up temporary canvas
            pageCanvas.width = 0;
            pageCanvas.height = 0;

            yOffset += contentHeight;
            pageNum++;
        }

        // Clean up main canvas
        canvas.width = 0;
        canvas.height = 0;

        // Save PDF with sanitized filename
        const filename = sanitizeFilename(title) + '.pdf';
        doc.save(filename);

        // Reset button
        if (button) {
            button.innerText = originalText || 'PDF version';
            button.disabled = false;
        }

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF: ' + error.message);

        // Reset button
        if (button) {
            button.innerText = originalText || 'PDF version';
            button.disabled = false;
        }
    }
}

/**
 * Generate a PDF with custom styling
 */
function generateStyledPDF(title, content, options = {}) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const defaults = {
        titleFontSize: 18,
        contentFontSize: 12,
        marginLeft: 15,
        marginTop: 20,
        maxWidth: 180,
        filename: 'document.pdf'
    };

    const opts = { ...defaults, ...options };

    // Add title
    doc.setFontSize(opts.titleFontSize);
    doc.text(title, opts.marginLeft, opts.marginTop);

    // Add content
    doc.setFontSize(opts.contentFontSize);
    const lines = doc.splitTextToSize(content, opts.maxWidth);
    doc.text(lines, opts.marginLeft, opts.marginTop + 15);

    // Save
    doc.save(opts.filename);
}
