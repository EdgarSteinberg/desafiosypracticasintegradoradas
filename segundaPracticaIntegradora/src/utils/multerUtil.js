import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "public/img")
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})

export const uploader = multer({storage})