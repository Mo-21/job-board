"use client";
import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);

interface UploadCompleteEvent extends Event {
  detail: {
    uuid: string;
  };
}

function JobApplication() {
  return (
    <>
      <lr-config
        ctx-name="my-uploader"
        pubkey="f44d29b014903527ac7e"
        maxLocalFileSizeBytes={10000000}
        multiple={false}
        sourceList="local"
        useCloudImageEditor={false}
      />

      <lr-file-uploader-regular
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.30.5/web/lr-file-uploader-regular.min.css"
        ctx-name="my-uploader"
        class="my-config"
      />
    </>
  );
}

export default JobApplication;
