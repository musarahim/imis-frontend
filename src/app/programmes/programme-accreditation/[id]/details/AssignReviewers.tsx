"use client";
import { AppForm, CheckboxInput, SubmitButton } from "@/components/forms";
import { Separator } from "@/components/ui/separator";
import {
    useAssignReviewersMutation,
    useGetProgrammeReviewersQuery,
} from "@/redux/features/programme-api-slice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

function AssignReviewers({ id }: { id: string }) {
  const router = useRouter();
  const {
    data: reviewers,
    isLoading,
    isError,
  } = useGetProgrammeReviewersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [assignReviewers, { isLoading: isAssigning }] =
    useAssignReviewersMutation();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const intialValues =
    reviewers?.reduce(
      (acc, reviewer) => {
        acc[`reviewer_${reviewer.id}`] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ) || {};
  const handleSubmit = (values: Record<string, boolean>) => {
    const selectedReviewers = reviewers?.filter(
      (reviewer) => values[`reviewer_${reviewer.id}`],
    );

    if (selectedReviewers) {
      selectedReviewers.forEach((reviewer) => {
        assignReviewers({ userId: reviewer.id, applicationId: Number(id) })
          .unwrap()
          .then(() => {
            toast.success(`Reviewer ${reviewer.name} assigned successfully`);
            router.push(`/programmes/programme-accreditation`);
          })
          .catch((error) => {
            // Handle error, e.g., show an error message
            console.error("Error assigning reviewer:", error);
            toast.error(`Error assigning reviewer ${reviewer.name}`);
          });
      });
    }
  };

  const validationSchema = Yup.object().shape(
    reviewers?.reduce(
      (acc, reviewer) => {
        acc[`reviewer_${reviewer.id}`] = Yup.boolean();
        return acc;
      },
      {} as Record<string, Yup.BooleanSchema>,
    ) ?? {},
  );

  return (
    <div>
      <AppForm
        initialValues={intialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <div className="mb-4 mt-1.5 text-lg text-center font-semibold">
          Assign Preliminary Reviewers
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4 p-3">
          {reviewers?.map((reviewer) => (
            <CheckboxInput
              key={reviewer.id}
              name={`reviewer_${reviewer.id}`}
              label={reviewer.name}
            />
          ))}
        </div>
        <div className=" text-center">
          <SubmitButton isLoading={isAssigning} title="Assign Reviewers" />
        </div>
      </AppForm>
    </div>
  );
}

export default AssignReviewers;
