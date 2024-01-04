"use client";
import * as LR from "@uploadcare/blocks";
import { OutputFileEntry } from "@uploadcare/blocks";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

LR.registerBlocks(LR);

interface Props {
  setData: React.Dispatch<
    React.SetStateAction<{ userId: string; resumeId: string } | undefined>
  >;
}

function UploadResume({ setData }: Props) {
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  const { data: session } = useSession();

  useEffect(() => {
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      const updatedFiles = e.detail;
      if (updatedFiles && updatedFiles.length > 0) {
        const firstUploadedFile = updatedFiles[0];
        if (session && firstUploadedFile && firstUploadedFile.uuid) {
          const data = {
            resumeId: firstUploadedFile.uuid,
            userId: session.user.id,
          };
          setData(data);
        }
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
  }, [session, setData]);

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
