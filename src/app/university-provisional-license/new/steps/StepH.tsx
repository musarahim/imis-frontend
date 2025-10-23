
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};
function StepH({ onBack, onNext, data }: StepCProps) {
  return (
    <div>StepH</div>
  )
}

export default StepH