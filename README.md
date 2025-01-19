# arXiv Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern, user-friendly interface for exploring scientific research papers from arXiv. Built with React, TypeScript, and Tailwind CSS, featuring semantic search capabilities and real-time relevance scoring.

![arXiv Explorer Screenshot](https://i.imgur.com/6IzGkj9.png)

## Features

- 🔍 **Semantic Search**: Advanced search functionality with real-time relevance scoring
- 📊 **Smart Ranking**: Papers are ranked using TF-IDF and semantic similarity
- 🎯 **Category Filtering**: Filter papers by specific research categories
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🌓 **Dark Mode**: Automatic theme switching based on system preferences
- 📄 **PDF Preview**: Direct access to paper PDFs
- 🔗 **Easy Sharing**: Share papers across various platforms

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/probiruk/arxiv-explorer.git
cd arxiv-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: arXiv API
- **Build Tool**: Vite

## How It Works

### Semantic Search

The search functionality uses a combination of TF-IDF (Term Frequency-Inverse Document Frequency) and semantic similarity to rank papers based on relevance:

1. **Term Frequency**: Measures how frequently a term appears in a document
2. **Inverse Document Frequency**: Measures how important a term is across all documents
3. **Semantic Similarity**: Considers context and meaning beyond exact matches
4. **Score Normalization**: Converts raw scores to percentages for easy understanding

### Paper Ranking

Papers are ranked using multiple factors:
- Query term matches in title and abstract
- Category relevance
- Publication date (when sorting by date)
- Author matches (for author searches)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [arXiv](https://arxiv.org/) for providing the API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- All the contributors who have helped to improve this project

## Support

If you find this project helpful, please consider:
- Starring the repository
- Reporting issues
- Contributing to the code
- Sharing with others

## Contact

Email - birukerjamo@gmail.com

Project Link: [https://arxivexplorer.com/](https://arxivexplorer.com/)
