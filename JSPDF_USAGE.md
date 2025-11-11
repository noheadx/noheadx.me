# Using jsPDF in Your Posts

jsPDF has been integrated into all your blog posts. Here's how to use it:

## Basic Usage

### Method 1: Using the Built-in Helper Function

Add a button to any post to generate a PDF of the entire post content:

```html
<button onclick="generateSimplePDF()">Download this post as PDF</button>
```

### Method 2: Creating Custom PDFs

You can create custom PDFs with your own content directly in your posts:

```html
<script>
function createMyPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add text
  doc.text("Hello from my blog post!", 10, 10);

  // Add more content
  doc.setFontSize(12);
  doc.text("This is some custom content.", 10, 20);

  // Save the PDF
  doc.save("my-custom-document.pdf");
}
</script>

<button onclick="createMyPDF()">Generate Custom PDF</button>
```

### Method 3: Using the Styled PDF Helper

Use the `generateStyledPDF()` function for quick styled PDFs:

```html
<script>
function myStyledPDF() {
  const title = "My Article Title";
  const content = "This is the content of my article...";

  generateStyledPDF(title, content, {
    titleFontSize: 20,
    contentFontSize: 11,
    filename: 'my-article.pdf'
  });
}
</script>

<button onclick="myStyledPDF()">Download Styled PDF</button>
```

## Advanced Examples

### Adding Images to PDFs

```javascript
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.text("Check out this image:", 10, 10);
// Note: Image must be in base64 format or from same origin
doc.addImage(imageData, 'PNG', 10, 20, 100, 100);
doc.save("document-with-image.pdf");
```

### Multi-page PDFs

```javascript
const { jsPDF } = window.jspdf;
const doc = new jsPDF();

doc.text("Page 1 content", 10, 10);
doc.addPage();
doc.text("Page 2 content", 10, 10);
doc.save("multi-page.pdf");
```

## Example in Your Markdown Posts

You can add this directly to any `.markdown` file:

```markdown
---
title: "My Post Title"
date: 2024-01-01
---

Here's my post content...

{{< unsafe >}}
<button onclick="generateSimplePDF()" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
  Download this Post as PDF
</button>
{{< /unsafe >}}
```

## Documentation

For full jsPDF documentation and more examples, visit:
https://github.com/parallax/jsPDF

The library is loaded on all post pages automatically, so you can use it in any post without additional setup.
