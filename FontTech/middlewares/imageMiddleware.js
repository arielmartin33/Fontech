const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/product');
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, filename);
    }
})

const uploadImage = multer({ storage });

module.exports = uploadImage;