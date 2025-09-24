
type StepBProps = {
  onNext: () => void;
  onBack: () => void;
}
function StepB({ onNext, onBack }: StepBProps) {
  return (
    <>
     <div className="border-t  border-gray-900/10  dark:border-gray-400"></div>
    <div>StepB</div>
    </>
    
  )
}

export default StepB