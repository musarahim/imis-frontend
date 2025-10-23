
type StepCProps = {
  onBack: () => void;
  onNext: (data?: any) => void;
  data?: UniversityProvisionalLicense;
};
function StepJ({ onBack, onNext, data }: StepCProps) {
  return (
    <div>StepJ</div>
  )
}

export default StepJ