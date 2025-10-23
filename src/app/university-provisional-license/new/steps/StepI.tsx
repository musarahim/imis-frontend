
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};
function StepI({ onBack, onNext, data }: StepCProps) {
  return (
    <div>StepI</div>
  )
}

export default StepI