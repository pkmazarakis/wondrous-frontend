import apollo from 'services/apollo';
import { GET_PRESIGNED_IMAGE_URL } from 'graphql/queries/media';
import { IMAGE_FILE_EXTENSIONS_TYPE_MAPPING, VIDEO_FILE_EXTENSIONS_TYPE_MAPPING } from './constants';

export const uploadMedia = async ({ filename, fileType, file }) => {
  try {
    const apolloResult = await apollo.query({
      query: GET_PRESIGNED_IMAGE_URL,
      variables: {
        filename,
      },
    });
    const apiUrl = apolloResult.data.getPresignedFileUrl.url;
    // TODO: parse filetype
    const uploadResponse = await fetch(apiUrl, {
      method: 'PUT',
      body: file,
    });
    // console.log('uploadResponse', uploadResponse, apiUrl)
  } catch (error) {
    console.log('error', JSON.stringify(error, null, 2));
  }
};

export const getFilenameAndType = (result) => {
  const uriArr = result.split('/');
  const filename = uriArr[uriArr.length - 1];
  const fileType = filename.substring(filename.lastIndexOf('.') + 1);
  return {
    filename,
    fileType,
  };
};

export const getVideoFileType = (result) => {
  const uriArr = result.split('ext=');
  const fileType = uriArr[uriArr.length - 1];
  return fileType;
};

export const handleAddFile = async (props) => {
  const { event, filePrefix, setMediaUploads, mediaUploads, setFileUploadLoading } = props;
  const file = event.target.files[0];
  if (file) {
    if (setFileUploadLoading) {
      setFileUploadLoading(true);
    }
    const fileName = file?.name;
    // get image preview
    const { fileType, filename } = getFilenameAndType(fileName);
    const fileUrl = filePrefix + filename;
    await uploadMedia({ filename: fileUrl, fileType, file });
    const fileToAdd = {
      uploadSlug: fileUrl,
      name: filename,
      type: '',
    };
    if (fileType in IMAGE_FILE_EXTENSIONS_TYPE_MAPPING) {
      fileToAdd.type = 'image';
    } else if (fileType in VIDEO_FILE_EXTENSIONS_TYPE_MAPPING) {
      fileToAdd.type = 'video';
    } else {
      fileToAdd.type = 'file';
    }
    setMediaUploads([...mediaUploads, fileToAdd]);
    if (setFileUploadLoading) {
      setFileUploadLoading(false);
    }
    return fileToAdd;
  }
};
