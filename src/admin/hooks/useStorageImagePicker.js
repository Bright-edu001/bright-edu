import { useCallback, useMemo, useState } from "react";
import { message } from "antd";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { app } from "../../config/firebaseCore";

const storage = getStorage(app);
const defaultMessages = {
  loadImagesError: "載入圖庫失敗",
  selectImageSuccess: "已選取圖片",
  uploadSuccess: (fileName) => `${fileName} 上傳成功`,
  uploadError: (fileName) => `${fileName} 上傳失敗`,
};

function useStorageImagePicker(form, options = {}) {
  const { messages = {} } = options;
  const resolvedMessages = useMemo(
    () => ({
      ...defaultMessages,
      ...messages,
    }),
    [messages],
  );
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [pickerTargetField, setPickerTargetField] = useState(null);
  const [storageImages, setStorageImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const fetchStorageImages = useCallback(async () => {
    setLoadingImages(true);
    try {
      const listRef = ref(storage, "blog/");
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        }),
      );
      setStorageImages(urls.reverse());
    } catch {
      message.error(resolvedMessages.loadImagesError);
    } finally {
      setLoadingImages(false);
    }
  }, [resolvedMessages.loadImagesError]);

  const openImagePicker = useCallback(
    (fieldName) => {
      setPickerTargetField(fieldName);
      setIsPickerVisible(true);
      if (storageImages.length === 0) {
        fetchStorageImages();
      }
    },
    [fetchStorageImages, storageImages.length],
  );

  const handleSelectImage = useCallback(
    (url) => {
      if (!pickerTargetField) return;
      form.setFieldsValue({ [pickerTargetField]: url });
      setIsPickerVisible(false);
      message.success(resolvedMessages.selectImageSuccess);
    },
    [form, pickerTargetField, resolvedMessages.selectImageSuccess],
  );

  const closePicker = useCallback(() => {
    setIsPickerVisible(false);
    setPickerTargetField(null);
  }, []);

  const handleUpload = useCallback(
    async (options, fieldName, setUploading) => {
      const { file, onSuccess, onError } = options;
      setUploading(true);
      try {
        const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
        const metadata = { cacheControl: "public, max-age=31536000" };
        const snapshot = await uploadBytes(storageRef, file, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        form.setFieldsValue({ [fieldName]: downloadURL });
        message.success(resolvedMessages.uploadSuccess(file.name));
        onSuccess("ok");
      } catch (error) {
        message.error(resolvedMessages.uploadError(file.name));
        onError(error);
      } finally {
        setUploading(false);
      }
    },
    [form, resolvedMessages],
  );

  return useMemo(
    () => ({
      isPickerVisible,
      loadingImages,
      storageImages,
      openImagePicker,
      handleSelectImage,
      closePicker,
      handleUpload,
    }),
    [
      isPickerVisible,
      loadingImages,
      storageImages,
      openImagePicker,
      handleSelectImage,
      closePicker,
      handleUpload,
    ],
  );
}

export default useStorageImagePicker;
