import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  router: AppRouterInstance;
  paramsToAppend: {
    level: string | null;
  };
  basePath?: string;
}

export const handleValueChange = ({
  router,
  paramsToAppend,
  basePath = "/jobs",
}: Props) => {
  const params = new URLSearchParams();
  Object.entries(paramsToAppend).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const query = params.toString() ? `?${params.toString()}` : "all";
  router.push(`${basePath}${query}`);
};
