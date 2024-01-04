"use client";
import * as LR from "@uploadcare/blocks";
import { OutputFileEntry } from "@uploadcare/blocks";
import { useEffect, useRef, useState } from "react";
import useApply from "../services/applyForJob";

LR.registerBlocks(LR);

interface Props {
  setIsApplied: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  jobId: string | undefined;
}

function UploadResume({ setIsApplied, jobId }: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([]);
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  const { applyForJob, status } = useApply(jobId);

  useEffect(() => {
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      if (e.detail) {
        setUploadedFiles([...e.detail]);
        const data = {};
      }
    };

    const ctxProvider = ctxProviderRef.current;
    if (ctxProvider) {
      ctxProvider.addEventListener(
        "data-output",
        handleUploadEvent as EventListener
      );

      return () => {
        ctxProvider.removeEventListener(
          "data-output",
          handleUploadEvent as EventListener
        );
      };
    }
  }, [setUploadedFiles]);

  return (
    <div className="flex justify-center">
      <lr-config
        ctx-name="my-uploader"
        pubkey="f44d29b014903527ac7e"
        maxLocalFileSizeBytes={10000000}
        multiple={false}
        sourceList="local"
        useCloudImageEditor={false}
        confirmUpload={true}
      />
      <lr-file-uploader-regular
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.30.5/web/lr-file-uploader-regular.min.css"
        ctx-name="my-uploader"
        class="my-config"
      />
      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
}

export default UploadResume;
