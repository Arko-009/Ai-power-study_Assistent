/**
 * split text into chunks for better AI processing
 * @param {string} text- Full text to chunk
 * @params {number} chunkSize- size of each chunk
 * @params {number} overlap- size of overlap between chunks
 * @returns {Arrays<{content:string,chunkIndex:number,pageNumber:number}>}
 */

export const chunkText = (text , chunkSize =500 , overlap = 50) =>{
    if(!text || text.trim().length === 0){
        return [];
    }

    // Clean text while (Single or double)
    const cleanedText = text
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .replace(/\n/g, '\n')
    .replace(/ \n/g, '\n')
    .trim();
    //Try to split by paraagraphs
    const paragraph = cleanedText.split(/\n+/).filter(p => p.trim().length > 0);

    const chunks = [];
    let currentChunk = [];
    let currentWordCount = 0 ;
    let chunkIndex = 0 ;

    for(constparagraph of paragraphs){
        const paragraphWords = paragraph.trim().split(/\s+/);
        const paragraphWordCount = paragraphWords.length;
    }
}