/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const ATTACHMENT_MAX_BYTES = 1024 * 1024 * 100;
const ATTACHMENT_PATH = '../../Images';
const uuid = require('node-uuid');

module.exports = {
    uploadAttachment: function(req, res){

        var path = ATTACHMENT_PATH.split('/')[2];
        let fileName = uuid.v4();

        var file = req.file('file').on('error', () => {
            sails.log('File upload timeout!');
        });

        if (!file._files[0]) {
            return res.json({
                errno: 1,
                info: 'No attachments are uploaded'
            });
        }
        var name = file._files[0].stream.filename;
        let ext = name.substring(name.lastIndexOf("."));

        file.upload({
            maxBytes: ATTACHMENT_MAX_BYTES,
            dirname: ATTACHMENT_PATH + '/',
            saveAs: fileName + ext

        }, function whenDone(err, uploadedFiles) {
            if (err) {
                sails.log(err);
                return res.json({
                    errno: 1,
                    err: err
                 });
            }
            return res.json({
                errno: 0,
                path: path + '/' + uploadedFiles[0].filename
             });
            
        });

    },

};

