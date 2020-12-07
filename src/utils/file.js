import {editorEndpoint} from '@/utils/endpoints.js'

export default {
  doUpload(extension, content, endpoint) {
    const endpnt = endpoint || editorEndpoint
    return this.getUpload(extension, endpnt)
      .then((doc) => {
          return fetch(doc.uploadURL, {
              method: "PUT",
              body: content
          }).then(() => doc.filename);
      });
  },

  getUpload(extension, endpoint) {
    const endpnt = endpoint || editorEndpoint
    return fetch(endpnt + "/file/" + extension, {method: 'POST'})
      .then((x) => x.json())
  },

  getImageUpload (imageFile, endpoint) {
    let mime = imageFile.type.split("/");
      if (mime.length < 2) {
          return Promise.reject("Unknown file type");
      }
      let type = mime[0];
      let subtype = mime[1];
      if (type !== "image") {
          return Promise.reject("Not an image");
      }
      return this.getUpload(subtype, imageFile, endpoint)  
  },

  uploadImage(imageFile, endpoint) {
    let mime = imageFile.type.split("/");
      if (mime.length < 2) {
          return Promise.reject("Unknown file type");
      }
      let type = mime[0];
      let subtype = mime[1];
      if (type !== "image") {
          return Promise.reject("Not an image");
      }
      return this.doUpload(subtype, imageFile, endpoint)
  },

  deleteFile(file, endpoint) {
    const endpnt = endpoint || editorEndpoint

    return fetch(endpnt + "/file/" + file, {method: 'DELETE'});
  }
}