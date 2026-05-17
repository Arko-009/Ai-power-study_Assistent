import Document from '../models/Document.js';
import Flashcard from '../models/Flashcard.js';
import Quiz from '../models/Quiz.js';
import {extractTextFromPDF} from '../utils/pdfParser.js';
import {chunkText} from '../utils/textChunker.js';
import fs from 'fs/promises';
import mongoose from 'mongoose';
//@desc upload PDF document
//@route POST /api/document/upload
// @access private
export const uploadDocument = async (req,res,next) => {
    try {
        
    }catch(error){
        //clean up file on error
        if(req.file){
            await fs.unlink(req.file.path).catch(() =>{});
        }
        next(error);
    }
};    
//@desc Get all user documents
//@routes GET/api/documents
// @access private
export const getDocuments = async (req, res,next)=>{

};

//@desc Get single document
//@routes GET/api/documents/:id
// @access private
export const getDocument = async (req, res,next)=>{

}
//@desc Delete document
//@routes DELETE/api/documents/:id
// @access private
export const deleteDocument = async (req, res,next)=>{

}


//@desc Updates document title
//@routes PUT/api/documents/:id
// @access private
export const updateDocument = async (req, res,next)=>{

}