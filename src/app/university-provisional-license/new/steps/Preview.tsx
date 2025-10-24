import { useGetInstitutionsQuery } from "@/redux/features/institution-api-slice";
type StepDProps = {
  data?: IntrimAuthority;
  onStepClick: (step: string) => void;
};
function Preview({ data, onStepClick }: StepDProps) {
    const { data: institutions, isLoading: isLoadingInstitutions } =
        useGetInstitutionsQuery(undefined, { refetchOnMountOrArgChange: true });
      const institution = institutions?.results[0];
  return (
      <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          PREVIEW APPLICATION
        </h2>
      </div>
  )
}

export default Preview