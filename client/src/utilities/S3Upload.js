import * as AWS from "aws-sdk/global";
import * as S3 from "aws-sdk/clients/s3";
import { v4 as uuid } from "uuid";
import environment from "environment";

export const S3Upload = (file, onProgress) => {
  const uniquename = uuid();

  const fileExtension = file.name.replace(/^.*\./, "");
  const filename = uniquename + "." + fileExtension;

  AWS.config.update({
    region: environment.s3Region,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.IdentityPoolId
    })
  });

  const S3Client = new S3();
  const params = {
    Bucket: environment.bucketName,
    Key: filename,
    Body: file,
    // ACL: 'public-read',
    ContentType: file.type
  };
  return new Promise((resolve, reject) => {
    S3Client.upload(params, function(err, data) {
      if (err) {
        return reject(err);
      }

      return resolve({
        url: `${environment.cloudfrontUrl}/${data.Key}`,
        filename: data.key
      });
    }).on("httpUploadProgress", event => {
      const progress = Math.round((event.loaded / event.total) * 100);
      onProgress && onProgress(progress);
    });
  });
};

export const deleteAWSFile = async file => {
  AWS.config.update({
    region: environment.s3Region,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.IdentityPoolId
    })
  });
  const S3Client = new S3();
  S3Client.deleteObject(
    { Bucket: environment.bucketName, Key: file.name },
    function(data, d) {
    }
  );
};
