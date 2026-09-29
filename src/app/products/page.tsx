import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlagshipSevaDesk, FlagshipAttendance } from "@/components/sections/Flagships";
import { ChhatrapatiShowcase } from "@/components/sections/ChhatrapatiShowcase";

export const metadata: Metadata = {
  title: "Products",
  description: "SevaDesk — business operations, connected. JK Attendance — attendance, reimagined.",
};

export default function ProductsPage() {
  return (
    <div className="shell space-y-16 pb-28 pt-36 sm:pt-44">
      <SectionHeading
        eyebrow="PRODUCTS"
        title="Products, not projects."
        supporting="Built once, engineered to serve many businesses."
      />
      <FlagshipSevaDesk />
      <FlagshipAttendance />
      <ChhatrapatiShowcase />
    </div>
  );
}
