import fs from 'fs/promises';
import { PDFParse } from 'pdf-parse';

/**
 * Extract text from PDF file
 * @param {string} filePath - Path to PDF file or HTTP URL
 * @returns {Promise<{text: string, numPages: number, info: object}>}
 */
export const extractTextFromPDF = async (filePath) => {
    try {
        let dataBuffer;
        if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
            const response = await fetch(filePath);
            const arrayBuffer = await response.arrayBuffer();
            dataBuffer = Buffer.from(arrayBuffer);
        } else {
            dataBuffer = await fs.readFile(filePath);
        }
        
        // pdf-parse expects a Unit8Array, not a Buffer
        const parser = new PDFParse(new Uint8Array(dataBuffer));
        const data = await parser.getText();
        return {
            text: data.text,
            numPages: data.numpages,
            info: data.info
        };
    } catch (error) {
        console.error("PDF parsing error:", error);
        throw new Error("Failed to extract text from PDF");
    }
}