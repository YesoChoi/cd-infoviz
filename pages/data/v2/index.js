import ShoeWorkerDisplay from '/components/data/v2';
import { FlexCenterStyle, WholeContainer } from '@/styles/common';

export default function Home() {
  return (
    <div>
      <h1>Shoe Worker Data</h1>
      <ShoeWorkerDisplay />
    </div>
  );
}
