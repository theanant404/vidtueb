import multer from 'multer';
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/temp');
    },
    filename:(req,file,cb)=>{
        // addd some coustem logic for renameing file
        file.originalname= file.originalname.replace(/\s/g,'');
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(new Error('file type not supported'),false);
    }
}
export const upload = multer({storage,fileFilter});