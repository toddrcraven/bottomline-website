import { Suspense } from "react";
import FeaturesClient from "./FeaturesClient";

export default function FeaturesPage() {
  return (
    <Suspense fallback={null}>
      <FeaturesClient />
    </Suspense>
  );
}
