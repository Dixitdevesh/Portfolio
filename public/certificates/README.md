# Devesh Lab Certificate Import Workflow

This folder serves as the local repository for all participation and achievement certificates displayed on your portfolio website.

## How to Add Your Certificates

1. **Download your Certificates**:
   - Go to your accounts (e.g., Unstop, Google Gemini events portal, hackathon portals).
   - Download the certificates as **PDF**, **PNG**, or **JPG** files.

2. **Save Files to this Directory**:
   - Save the certificate files inside this folder: `/public/certificates/`.
   - Use clean, simple naming conventions. For example:
     - `unstop-week-of-wins.jpg`
     - `gemini-quizoff.pdf`

3. **Update Certificates Metadata**:
   - Open the portfolio codebase.
   - Go to the file: [certificates.ts](file:///f:/New%20folder%20(3)/src/data/certificates.ts).
   - Add a new entry to the `certificatesData` array matching the structure:
     ```typescript
     {
       id: 'unstop-wins-2026',
       title: 'Unstop Week-of-Wins',
       event: 'Unstop Week-of-Wins',
       date: '16 Jun 2026',
       type: 'Participation',
       image: 'certificates/unstop-wins-2026.jpg', // Path relative to /public/
       pdf: 'certificates/unstop-wins-2026.pdf',    // Optional: Path to PDF
       verificationUrl: 'https://unstop.com/certificate/verify/...' // Optional
     }
     ```

## Supported Formats

- **Images (`PNG`, `JPG`, `WEBP`)**: Displays an interactive modal window popup on click.
- **PDFs**: Opens directly in a new browser tab for high-fidelity viewing.
- **Verification Links**: Provides a secure external redirect button on the certificate card if a verification URL is specified.
