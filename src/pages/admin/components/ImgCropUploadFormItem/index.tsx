import React, { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { message, Upload } from 'antd';
import { getAuthorizeToken, getBaseUrl } from '@/utils/common-util';
import type { UploadFile } from 'antd/es/upload/interface';

export type ImgCropUploadFormItemType = {
  value?: any;
  onChange?: (value: any) => void;
};

const ImgCropUploadFormItem: React.FC<ImgCropUploadFormItemType> = (props) => {
  const [thumbFileList, setThumbFileList] = useState<UploadFile[]>([]);
  const [thumbUrl, setThumbUrl] = useState<string>();

  useEffect(() => {
    setThumbUrl(props.value);
  }, []);

  const updateThumbUrl = (url: string | undefined) => {
    setThumbUrl(url);
    props.onChange?.(url);
  };

  const onPreview = () => {
    const image = new Image();
    image.src = thumbUrl as string;
    const imgWindow = window.open(thumbUrl);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = thumbUrl as string;
    }
  };

  return (
    <ImgCrop grid aspect={3 / 2} rotate>
      <Upload
        action={`${getBaseUrl()}/blog/v1/admin/upload/image`}
        headers={{ token: getAuthorizeToken() }}
        listType={'picture-card'}
        maxCount={1}
        fileList={thumbFileList}
        onPreview={() => {
          onPreview();
        }}
        onChange={(info) => {
          setThumbFileList(info.fileList);
          if (info.file.status === 'done') {
            if (info.file.response.code === 0) {
              updateThumbUrl(info.file.response.data);
            } else {
              message.error('图片上传失败');
              setThumbFileList([]);
            }
          }
          // 删除的情况
          if (info.file.status === 'removed') {
            updateThumbUrl(undefined);
          }
        }}
      >
        {thumbFileList?.length === 0 && '+ 封面图'}
      </Upload>
    </ImgCrop>
  );
};

export default ImgCropUploadFormItem;
