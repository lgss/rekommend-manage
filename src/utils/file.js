const defEndpoint = process.env.VUE_APP_API_ENDPOINT

exports.doUpload = (extension, content, endpoint) => {
  const endpnt = endpoint || defEndpoint
  return this.getUpload(extension, endpnt)
    .then((doc) => {
        fetch(doc.uploadURL, {
            method: "PUT",
            body: content
        })
        return doc.filename;
    });
}

exports.getUpload = (extension, endpoint) => {
  const endpnt = endpoint || defEndpoint
  return fetch(endpnt + "/file/" + extension, {method: 'POST'})
    .then((x) => x.json())
}

exports.getImageUpload = (imageFile, endpoint) => {
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
}

exports.uploadImage = (imageFile, endpoint) => {
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
}

exports.deleteFile = (file, endpoint) => {
  const endpnt = endpoint || defEndpoint

  return fetch(endpnt + "/file/" + file, {method: 'DELETE'});
}