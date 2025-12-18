# The CTO Trap

A personal blog exploring technology leadership, management, and software engineering insights by Axel Schulz.

## About

This is the source repository for [noheadx.me](http://www.noheadx.me), a blog focused on the challenges and experiences of technology leadership. The blog covers topics including:

- CTO challenges and responsibilities
- Engineering leadership and management
- Software architecture and design patterns
- Team culture and organizational dynamics
- Technical decision-making

## Tech Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/)
- **Theme**: [hugo-coder](https://github.com/luizdepra/hugo-coder)
- **Language**: Go-based templating with Markdown content
- **Styling**: SCSS/CSS with custom overrides

## Project Structure

```
.
├── archetypes/       # Content templates
├── content/          # Blog posts and pages
│   ├── aboutme/      # About page
│   └── posts/        # Blog posts
├── layouts/          # Custom layout overrides
│   ├── _partials/    # Partial templates
│   ├── posts/        # Post-specific layouts
│   └── shortcodes/   # Custom Hugo shortcodes
├── static/           # Static assets (images, CSS, JS)
├── themes/           # Hugo theme (hugo-coder)
├── hugo.toml         # Main Hugo configuration
└── hugo.yaml         # Additional Hugo configuration
```

## Getting Started

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (Extended version recommended)
- Git (for theme submodule)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/noheadx/noheadx.me.git
cd noheadx.me
```

2. Initialize the theme submodule:
```bash
git submodule update --init --recursive
```

### Local Development

Run the Hugo development server:

```bash
hugo server
```

The site will be available at `http://localhost:1313`

For development with drafts enabled:

```bash
hugo server -D
```

### Building for Production

Generate the static site:

```bash
hugo
```

The built site will be in the `public/` directory.

## Content Management

### Creating a New Post

```bash
hugo new posts/YYYY-MM-DD-post-title.markdown
```

Posts should include front matter with:
- `title`: Post title
- `date`: Publication date
- `categories`: Array of categories (e.g., `['Leadership', 'Technology']`)
- `summary`: Brief description
- `draft`: Set to `false` when ready to publish

### Categories

Posts are organized by categories including:
- Leadership
- Technology
- Year-based categories (e.g., '2024', '2025')

## Configuration

Key configuration options in `hugo.toml`:

- **baseurl**: Site URL
- **title**: Site title
- **theme**: Active theme
- **params.author**: Author name
- **params.info**: Author tagline
- **params.social**: Social media links

## Customization

- Custom CSS: `static/css/custom.css`
- Custom layouts: `layouts/` directory
- Custom shortcodes: `layouts/shortcodes/`

## Author

**Axel Schulz**
Tech traveller, manager, father, husband - adding another 2 cents to this world

- GitHub: [@noheadx](https://github.com/noheadx/)
- LinkedIn: [luckyguy](https://LinkedIn.com/luckyguy/)

## License

Content is copyright © Axel Schulz. All rights reserved.

The hugo-coder theme is licensed under the MIT License.
